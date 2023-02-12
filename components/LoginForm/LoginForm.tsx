import React, { useState } from "react";
import styles from "./LoginForm.module.css";
import card2 from "../../public/card2.jpg";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/router";
import { Alert } from "@mui/material";

const LoginForm = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(false);

  const router = useRouter();

  const requestOptions = {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      data: {
        email: email,
        password: password,
      },
    }),
  };
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log("email", email);

    await fetch("/api/loginUser", requestOptions)
      .then((res) => {
        if (res.status === 200) {
          router.push("/account");
          sessionStorage.setItem("login", "successful");
          res.json().then((data) => {
            sessionStorage.setItem("refId", data.refId);
          });
        } else {
          setError(true);
        }

        console.log("hello");
      })

      .catch((e) => console.log(e));
    // router.push("/");
  };

  return (
    <div className={styles.form__container}>
      <div className={styles.form__container__left}>
        <h1 className={styles.form__container__title}>Login</h1>
        <form onSubmit={handleSubmit}>
          <div className={styles.form__input}>
            <label>Email</label>
            <input
              type="email"
              placeholder="Email"
              name="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className={styles.form__input}>
            <label>Password</label>
            <input
              type="password"
              placeholder="Password"
              name="password"
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          {error && <Alert severity="error">Invalid email or password</Alert>}

          <button className={styles.form__button} type="submit">
            Login
          </button>
        </form>
        <p>
          Do not have an account?{" "}
          <Link href="/register" className={styles.form__sign}>
            Sign Up
          </Link>
        </p>
      </div>
      <Image src={card2} alt="form" className={styles.form__image} />
    </div>
  );
};

export default LoginForm;
