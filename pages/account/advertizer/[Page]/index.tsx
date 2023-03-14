import { useRouter } from "next/router";
import React from "react";
import AdvertizerProfilePage from "../../../../components/Advertizer/AdvertizerProfilePage/AdvertizerProfilePage";
import Footer from "../../../../components/Footer/Footer";
import Header from "../../../../components/Header/Header";
import Sidebar from "../../../../components/Sidebar/Sidebar";
import styles from "./page.module.css";

const Index = () => {
  const router = useRouter();
  return (
    <>
      <Header />
      <div className={styles.wrapper}>
        <Sidebar />
        <AdvertizerProfilePage
          campaignName={router.query.campaignName}
          landingPageUrl={router.query.landingPageUrl}
        />
      </div>
      <Footer />
    </>
  );
};

export default Index;
