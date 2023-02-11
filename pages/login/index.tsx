import Image from "next/image";
import Link from "next/link";
import React from "react";
import styles from "./login.module.css";
import card2 from "../../public/card2.jpg";
import Header from "../../components/Header/Header";
import Footer from "../../components/Footer/Footer";
import LoginForm from "../../components/LoginForm/LoginForm";

const login = () => {
  return (
    <div className={styles.wrapper}>
      <Header />
      <LoginForm />
      <Footer />
    </div>
  );
};

export default login;
