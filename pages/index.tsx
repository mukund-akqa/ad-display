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

interface Props {
  footerData: IFooterFields[];
}

export default function Home() {
  

  return (
    <>
      {/* <Head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head> */}
      <div className={styles.wrapper}>
        <Header />
        {/* <Account/> */}
        {/* <Content />
      <CardList/>
      <Info/> */}
        {/* <RegisterForm/> */}
        {/* <LoginForm/> */}
        <Main />
        <Footer />
      </div>
    </>
  );
}

// export const getStaticProps: GetStaticProps<Props> = async () => {
//   const footerData = (
//     await ContentService.instance.getEntriesByType<IFooterFields>("footer")
//   ).map((entry) => entry.fields);

//   return {
//     props: {
//       footerData,
//     },
//   };
// };
