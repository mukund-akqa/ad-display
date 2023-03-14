import React, { useEffect, useState } from "react";
import styles from "./LoginForm.module.css";
import Link from "next/link";
import { useRouter } from "next/router";
import { Alert } from "@mui/material";
import { client } from "../../utils/contentfulClient";

const LoginForm = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(false);
  const [data, setData] = useState<any>([]);
  const router = useRouter();
  const getLoginData = async () => {
    try {
      const response = await client.getEntries({ content_type: "login" });
      const responseData: any = response.items;
      setData(responseData);
    } catch (e) {
      console.log(e);
    }
  };
  useEffect(() => {
    getLoginData();
  }, []);

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
      })
      .catch((e) => console.log(e));
  };

  return (
    <div className={styles.form__container}>
      <div className={styles.form__container__left}>
        <h1 className={styles.form__container__title}>Login</h1>
        <form onSubmit={handleSubmit}>
          <div className={styles.form__input}>
            <label className={styles.form__input__label}>Email</label>
            <input
              type="email"
              placeholder="Email"
              name="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className={styles.form__input}>
            <label className={styles.form__input__label}>Password</label>
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

      <img
        src={data[0]?.fields.loginImage.fields.file.url}
        alt="form"
        className={styles.form__image}
      />
    </div>
  );
};

export default LoginForm;
