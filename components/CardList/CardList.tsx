import Card from "../Card/Card";
import card1 from "../../public/card1.jpg";
import card2 from "../../public/card2.jpg";
import card3 from "../../public/card3.jpg";
import card4 from "../../public/card4.jpg";
import styles from "./CardList.module.css";
import { client } from "../../lib/contentfulClient";
import { useEffect, useState } from "react";

const CardList = () => {
  const [data, setData] = useState<any>([]);
  const getCardData = async () => {
    try {
      const response = await client.getEntries({ content_type: "adCard" });
      const responseData: any = response.items;
      // console.log("CardData", responseData);
      setData(response);
      const cards = responseData.map((item: any) => item.fields);
      // console.log("cards", cards);
      setData(cards);
    } catch (e) {
      console.log(e);
    }
  };
  useEffect(() => {
    getCardData();
  }, []);
  // console.log("data", data);
  // console.log(data[0].cardImage.fields.file.url)
  return (
    <div className={styles.cardlist}>
      {data.map((item: any) => {
        let imageUrl = item.cardImage.fields.file.url;
        let url = imageUrl.substring(2);
        // console.log("url", imageUrl);
        return (
          <Card
            img={item.cardImage.fields.file.url}
            title={item.title}
            description={item.type}
          />
        );
      })}
      {/* <Card img={card1} title="Card1" description="Soft Drinks" />
      <Card img={card2} title="Card1" description="Fashion" />
      <Card img={card3} title="Card1" description="Media" />
      <Card img={card4} title="Card1" description="Ecommerce" /> */}
    </div>
  );
};

export default CardList;
