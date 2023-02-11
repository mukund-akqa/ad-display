import React from "react";
import Dashboard from "../../../components/Dashboard/Dashboard";
import Footer from "../../../components/Footer/Footer";
import Header from "../../../components/Header/Header";
import Sidebar from "../../../components/Sidebar/Sidebar";
import UserProfile from "../../../components/UserProfile/UserProfile";
import styles from "./dashboard.module.css";

const dashboard = () => {
  return (
    <>
      <Header />
      <div className={styles.wrapper}>
        <Sidebar />
        <Dashboard />
      </div>
      <Footer />
    </>
  );
};

export default dashboard;
