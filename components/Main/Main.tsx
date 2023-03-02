import React, { useEffect, useState } from "react";
import CardList from "../CardList/CardList";
import Content from "../Content/Content";
import Info from "../Info/Info";
import styles from "./Main.module.css";

const Main = () => {
  return (
    <div className={styles.main}>
      <Content />
      <CardList />
      <Info />
    </div>
  );
};

export default Main;
