import { createClient } from "contentful";
import { GetStaticProps } from "next";
import Head from "next/head";
import Image from "next/image";
import { IFooterFields } from "../@types/generated/contentful";
import ContentService from "../src/util/content-service";
import Footer from "../components/Footer/Footer";
import Header from "../components/Header/Header";
import styles from "../styles/Home.module.css";
import Content from "../components/Content/Content";
import CardList from "../components/CardList/CardList";
import Info from "../components/Info/Info";
import RegisterForm from "../components/RegisterForm/RegisterForm";
import LoginForm from "../components/LoginForm/LoginForm";
import Account from "../components/Account/Account";
import Main from "../components/Main/Main";
import { useEffect } from "react";

export default function Home() {
  return (
    <>
      <div className={styles.wrapper}>
        <Header />

        <Main />
        <Footer />
      </div>
    </>
  );
}


