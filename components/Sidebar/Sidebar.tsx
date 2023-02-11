import { faAdversal } from "@fortawesome/free-brands-svg-icons";
import { faUser } from "@fortawesome/free-regular-svg-icons";
import { faChartLine, faRectangleAd } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Link from "next/link";
import React from "react";
import styles from "./Sidebar.module.css";

const Sidebar = () => {
  return (
    <div className={styles.sidebar}>
      <div className={styles.sidebar__container}>
        <div className={styles.sidebar__container__menu}>
          <h3 className={styles.sidebar__container__menu__title}>My Account</h3>
          <ul className={styles.sidebar__container__menu__list}>
            <li className={styles.sidebar__container__menu__list__item}>
              <FontAwesomeIcon
                icon={faChartLine}
                className={styles.sidebar__container__menu__list__item__icon}
              />
              <Link href='/account/dashboard'>Dashboard</Link>
            </li>
            <li className={styles.sidebar__container__menu__list__item}>
              <FontAwesomeIcon
                icon={faUser}
                className={styles.sidebar__container__menu__list__item__icon}
              />
              <Link href='/account/profile'>User Profile</Link>
            </li>
            <li className={styles.sidebar__container__menu__list__item}>
              <FontAwesomeIcon
                icon={faAdversal}
                className={styles.sidebar__container__menu__list__item__icon}
              />
              <Link href='/account/publisher'>Publisher Profile</Link>
            </li>
            <li className={styles.sidebar__container__menu__list__item}>
              <FontAwesomeIcon
                icon={faRectangleAd}
                className={styles.sidebar__container__menu__list__item__icon}
              />
              <Link href='/account/advertizer'>Advertiser Profile</Link>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
