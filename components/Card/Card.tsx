import Image, { StaticImageData } from "next/image";
import React from "react";
import styles from "./Card.module.css";

type CardProps = {
  img: string;
  title: String;
  description: String;
};

const Card = ({ img, title, description }: CardProps) => {
  return (
    <div className={styles.card}>
      <img
        src={img}
        alt="card"
        className={styles.card__img}
        width={224}
        height={176}
      />
      <div className={styles.card__body}>
        <h2 className={styles.card__title}>{title}</h2>
        <p className={styles.card__description}>{description}</p>
        <button className={styles.card__btn}>Read More</button>
      </div>
    </div>
  );
};

export default Card;
