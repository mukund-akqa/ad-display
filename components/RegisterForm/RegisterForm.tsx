import Image from "next/image";
import Link from "next/link";
import React, { useState } from "react";
import styles from "./RegisterForm.module.css";
import card4 from "../../public/card4.jpg";
import { useRouter } from "next/router";
import { Alert } from "@mui/material";
import { StyleRegistry } from "styled-jsx";

type Response = {
  name: string;
  email: string;
  password: string;
  copassword: string;
  refId: number;
};

const RegisterForm = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [copassword, setCopassword] = useState("");
  const [phone, setPhone] = useState("");
  const [siteName, setSiteName] = useState("");
  const [invalidPassword, setInvalidPassword] = useState(false);
  const router = useRouter();

  const requestOptions = {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      data: {
        name: name,
        email: email,
        password: password,
        phone: phone,
        siteName: siteName,
      },
    }),
  };
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log("name", name);
    if (password !== copassword) {
      setInvalidPassword(true)
      return false;
    } else {
      await fetch("api/registerUser", requestOptions)
        .then((res) => {
          if (res.status === 200) {
            res.json().then((data) => {
              sessionStorage.setItem("refId", data.refId);
            });
            router.push("/login");
          }
        })
        .catch((e) => console.log(e));
    }
  };

  return (
    <div className={styles.form__container}>
      <div className={styles.form__container__left}>
        <h1 className={styles.form__container__title}>Registration</h1>
        <form onSubmit={handleSubmit}>
          <div className={styles.form__input}>
            <label className={styles.form__input__label}>Name</label>
            <input
              type="text"
              placeholder="Name"
              name="name"
              onChange={(e) => setName(e.target.value)}
              value={name}
              required
            />
          </div>
          <div className={styles.form__input}>
            <label className={styles.form__input__label}>Email</label>
            <input
              type="email"
              placeholder="Email"
              name="email"
              onChange={(e) => setEmail(e.target.value)}
              value={email}
              required
            />
          </div>
          <div className={styles.form__input}>
            <label className={styles.form__input__label}>Phone</label>
            <input
              type="text"
              placeholder="Phone"
              name="phone"
              onChange={(e) => setPhone(e.target.value)}
              value={phone}
              required
            />
          </div>
          <div className={styles.form__input}>
            <label className={styles.form__input__label}>Site Name</label>
            <input
              type="text"
              placeholder="Site Name"
              name="siteName"
              onChange={(e) => setSiteName(e.target.value)}
              value={siteName}
              required
            />
          </div>
          <div className={styles.form__input}>
            <label className={styles.form__input__label}>Password</label>
            <input
              type="password"
              placeholder="Password"
              name="password"
              onChange={(e) => setPassword(e.target.value)}
              value={password}
              required
            />
          </div>
          <div className={styles.form__input}>
            <label className={styles.form__input__label}>Confirm Password</label>
            <input
              type="password"
              placeholder="Confirm Password"
              name="password"
              onChange={(e) => setCopassword(e.target.value)}
              value={copassword}
              required
            />
          </div>
          {invalidPassword && <Alert severity="error">Passwords not matching</Alert>}
          <button className={styles.form__button} type="submit">
            Register
          </button>
        </form>
        <p>
          Already have an account?{" "}
          <Link href="/login" className={styles.form__sign}>
            Sign In
          </Link>
        </p>
      </div>
      <Image src={card4} alt="form" className={styles.form__image} />
    </div>
  );
};

export default RegisterForm;
