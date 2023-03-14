import Link from "next/link";
import React, { useEffect, useState } from "react";
import { client } from "../../utils/contentfulClient";
import styles from "./Content.module.css";

const Content = () => {
  const [data, setData] = useState<any>([]);
  const getBannerData = async () => {
    try {
      const response = await client.getEntries({ content_type: "adBanner" });
      const responseData: any = response.items;
      setData(responseData);
    } catch (e) {
      console.log(e);
    }
  };
  useEffect(() => {
    getBannerData();
  }, []);

  return (
    <main className={styles.main}>
      <div
        className={styles.main__hero}
        style={{
          backgroundImage: `url(${data[0]?.fields.bannerImage?.fields.file.url})`,
        }}
      >
        <h1>{data[0]?.fields.title}</h1>
        <p>{data[0]?.fields.description}</p>
        <Link href="#">{data[0]?.fields.button}</Link>
      </div>
    </main>
  );
};

export default Content;
