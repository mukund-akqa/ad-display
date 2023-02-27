import Card from "../Card/Card";
import card1 from "../../public/card1.jpg";
import card2 from "../../public/card2.jpg";
import card3 from "../../public/card3.jpg";
import card4 from "../../public/card4.jpg";
import styles from "./CardList.module.css";

const CardList = () => {
  return (
    <div className={styles.cardlist}>
      <Card img={card1} title="Card1" description="Soft Drinks" />
      <Card img={card2} title="Card1" description="Fashion" />
      <Card img={card3} title="Card1" description="Media" />
      <Card img={card4} title="Card1" description="Ecommerce" />
    </div>
  );
};

export default CardList;
