import Image from "next/image";
import Link from "next/link";
import React from "react";
import styles from "./register.module.css";
import card4 from "../../public/card4.jpg";
import RegisterForm from "../../components/RegisterForm/RegisterForm";
import Header from "../../components/Header/Header";
import Footer from "../../components/Footer/Footer";

const register = () => {
  return (
    <div className={styles.wrapper}>
        <Header/>
        <RegisterForm/>
        <Footer/>
    </div>
        

  );
};

export default register;
