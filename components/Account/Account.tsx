import React from "react";

import Dashboard from "../Dashboard/Dashboard";

import Sidebar from "../Sidebar/Sidebar";
import UserProfile from "../UserProfile/UserProfile";
import styles from "./Account.module.css";

const Account = () => {
  return (
    <div className={styles.account}>
      <Sidebar />
      {/* <UserProfile/> */}
      {/* <Advertizer/> */}
      <Dashboard />
      {/* <Publisher/> */}
    </div>
  );
};

export default Account;
