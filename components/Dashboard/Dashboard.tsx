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
          <span className={styles.dashboard__item__title}>Total Impressions</span>
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

// import "./featuredInfo.css";
// import { ArrowDownward, ArrowUpward } from "@material-ui/icons";

// export default function FeaturedInfo() {
//   return (
//     <div className="featured">
//       <div className="featuredItem">
//         <span className="featuredTitle">Revanue</span>
//         <div className="featuredMoneyContainer">
//           <span className="featuredMoney">$2,415</span>
//           <span className="featuredMoneyRate">
//             -11.4 <ArrowDownward  className="featuredIcon negative"/>
//           </span>
//         </div>
//         <span className="featuredSub">Compared to last month</span>
//       </div>
//       <div className="featuredItem">
//         <span className="featuredTitle">Sales</span>
//         <div className="featuredMoneyContainer">
//           <span className="featuredMoney">$4,415</span>
//           <span className="featuredMoneyRate">
//             -1.4 <ArrowDownward className="featuredIcon negative"/>
//           </span>
//         </div>
//         <span className="featuredSub">Compared to last month</span>
//       </div>
//       <div className="featuredItem">
//         <span className="featuredTitle">Cost</span>
//         <div className="featuredMoneyContainer">
//           <span className="featuredMoney">$2,225</span>
//           <span className="featuredMoneyRate">
//             +2.4 <ArrowUpward className="featuredIcon"/>
//           </span>
//         </div>
//         <span className="featuredSub">Compared to last month</span>
//       </div>
//     </div>
//   );
// }
