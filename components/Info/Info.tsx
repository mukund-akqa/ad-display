import Image from "next/image";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import info2 from "../../public/info2.jpg";
import styles from "./Info.module.css";
import { client } from "../../lib/contentfulClient";
const Info = () => {
  const [data, setData] = useState<any>([]);
  const getInfoData = async () => {
    try {
      const response = await client.getEntries({ content_type: "info" });
      const responseData: any = response.items;
      setData(responseData);
    } catch (e) {
      console.log(e);
    }
  };
  useEffect(() => {
    getInfoData();
  }, []);
  // console.log("info", data);

  return (
    <div className={styles.info__container}>
      {/* <div className={styles.info__container__image}> */}
        {/* <Image src={info2} alt="info" width={400} height={350} /> */}
        <img src={data[0]?.fields.infoImage.fields.file.url} alt="info" className={styles.info__image}/>
      {/* </div> */}
      <div className={styles.info__container__text}>
        <h1>{data[0]?.fields.title}</h1>
        <p>{data[0]?.fields.description}</p>
        <Link href="#">{data[0]?.fields.buttonText}</Link>
      </div>
    </div>
  );
};

export default Info;
