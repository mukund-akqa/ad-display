import { useRouter } from "next/router";
import React from "react";
import Footer from "../../../../components/Footer/Footer";
import Header from "../../../../components/Header/Header";
import PublisherProfilePage from "../../../../components/Publisher/PublisherProfilePage/PublisherProfilePage";
import Sidebar from "../../../../components/Sidebar/Sidebar";

import styles from "./page.module.css";

const Index = () => {
  const router = useRouter();
  return (
    <>
      <Header />
      <div className={styles.wrapper}>
        <Sidebar />
        <PublisherProfilePage
          pageName={router.query.pageName}
          pageUrl={router.query.pageUrl}
        />
      </div>
      <Footer />
    </>
  );
};

export default Index;
