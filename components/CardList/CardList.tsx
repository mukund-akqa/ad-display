import Card from "../Card/Card";
import styles from "./CardList.module.css";
import { client } from "../../utils/contentfulClient";
import { useEffect, useState } from "react";

const CardList = () => {
  const [data, setData] = useState<any>([]);
  const getCardData = async () => {
    try {
      const response = await client.getEntries({ content_type: "adCard" });
      const responseData: any = response.items;
      const cards = responseData.map((item: any) => item.fields);
      setData(cards);
    } catch (e) {
      console.log(e);
    }
  };
  useEffect(() => {
    getCardData();
  }, []);

  return (
    <div className={styles.cardlist}>
      {data.map((item: any) => {
        return (
          <Card
            img={item.cardImage.fields.file.url}
            title={item.title}
            description={item.type}
          />
        );
      })}
    </div>
  );
};

export default CardList;
