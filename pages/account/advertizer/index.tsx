import React from "react";
import AdvertizerProfile from "../../../components/Advertizer/AdvertizerProfile/AdvertizerProfile";
import Footer from "../../../components/Footer/Footer";
import Header from "../../../components/Header/Header";
import Sidebar from "../../../components/Sidebar/Sidebar";

import styles from "./advertizer.module.css";

const index = () => {
  return (
    <>
      <Header />
      <div className={styles.wrapper}>
        <Sidebar />
        <AdvertizerProfile />
      </div>
      <Footer />
    </>
  );
};

export default index;
