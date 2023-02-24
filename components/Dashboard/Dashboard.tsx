import { faArrowUp } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";
import styles from "./Dashboard.module.css";

const Dashboard = () => {
  return (
    <div className={styles.dashboard}>
      <h1 className={styles.dashboard__title}>Metrics</h1>
      <div className={styles.dashboard__container}>
        <div className={styles.dashboard__item}>
          <span className={styles.dashboard__item__title}>Total Ads</span>
          <div className={styles.dashboard__item__info}>
            <span className={styles.dashboard__item__info__text}>20</span>
            <span className={styles.dashboard__item__info__number}>
              +5
              <FontAwesomeIcon
                icon={faArrowUp}
                className={styles.dashboard__item__info__icon}
              />
            </span>
          </div>
          <span className={styles.dashboard__item__subinfo}>Recent Data</span>
        </div>
        <div className={styles.dashboard__item}>
          <span className={styles.dashboard__item__title}>Total Clicks</span>
          <div className={styles.dashboard__item__info}>
            <span className={styles.dashboard__item__info__text}>20</span>
            <span className={styles.dashboard__item__info__number}>
              +10
              <FontAwesomeIcon
                icon={faArrowUp}
                className={styles.dashboard__item__info__icon}
              />
            </span>
          </div>
          <span className={styles.dashboard__item__subinfo}>Recent Data</span>
        </div>
        <div className={styles.dashboard__item}>
          <span className={styles.dashboard__item__title}>
            Total Impressions
          </span>
          <div className={styles.dashboard__item__info}>
            <span className={styles.dashboard__item__info__text}>20</span>
            <span className={styles.dashboard__item__info__number}>
              +15
              <FontAwesomeIcon
                icon={faArrowUp}
                className={styles.dashboard__item__info__icon}
              />
            </span>
          </div>
          <span className={styles.dashboard__item__subinfo}>Recent Data</span>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
