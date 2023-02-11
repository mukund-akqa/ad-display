import Image from "next/image";
import Link from "next/link";
import React from "react";
import info2 from "../../public/info2.jpg";
import styles from "./Info.module.css";
const Info = () => {
  return (
    <div className={styles.info__container}>
        {/* <div className={styles.info__container__image}> */}
        <Image src={info2} alt="info" width={400} height={350}/>
      {/* </div> */}
      <div className={styles.info__container__text}>
        <h1>Advertise Yourself in a Better Way.</h1>
        <p>
          Lorem ipsum, dolor sit amet consectetur adipisicing elit. Dolor
          asperiores nesciunt voluptates tempore quaerat eius libero,
        </p>
        <Link href="#">Get Started</Link>
      </div>
      
    </div>
  );
};

export default Info;
