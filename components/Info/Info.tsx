import Link from "next/link";
import React, { useEffect, useState } from "react";
import styles from "./Info.module.css";
import { client } from "../../utils/contentfulClient";
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

  return (
    <div className={styles.info__container}>
      <img
        src={data[0]?.fields.infoImage.fields.file.url}
        alt="info"
        className={styles.info__image}
      />
      <div className={styles.info__container__text}>
        <h1>{data[0]?.fields.title}</h1>
        <p>{data[0]?.fields.description}</p>
        <Link href="#">{data[0]?.fields.buttonText}</Link>
      </div>
    </div>
  );
};

export default Info;
