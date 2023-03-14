import React from "react";
import Dashboard from "../Dashboard/Dashboard";
import Sidebar from "../Sidebar/Sidebar";
import styles from "./Account.module.css";

const Account = () => {
  return (
    <div className={styles.account}>
      <Sidebar />
      <Dashboard />
    </div>
  );
};

export default Account;
