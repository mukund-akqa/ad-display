import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faYoutube,
  faFacebook,
  faTwitter,
  faInstagram,
} from "@fortawesome/free-brands-svg-icons";

import React, { useEffect, useState } from "react";
import styles from "./Footer.module.css";
import { client as c } from "../../lib/contentfulClient";
import * as contentful from "contentful";

export const client = contentful.createClient({
  space: "zx1oww7gzayd",
  accessToken: "CCGg1vBRSts9iCobYeGq1Co7S510rlz5v-F3EB55GG8",
});

const Footer = () => {
  const [data, setData] = useState<any>([]);

  const fdata = async () => {
    await c
      .getEntries({
        content_type: "footer",
        limit: 2,
        include: 10,
      })
      .then((entry: any) => {
        console.log("akqa", entry);
        const footerlinks = entry.items[0].fields.footerLinks;
        setData(footerlinks);
        // console.log(footerlinks);
        footerlinks.map((item: any) => {
          const { title, navLinks } = item.fields;
          // console.log(title);
          navLinks.map((link: any) => {
            const { title, linkUrl } = link.fields;
            // console.log(title);
            // console.log(linkUrl);
          });
        });
      });
  };

  useEffect(() => {
    fdata();
  }, []);
  return (
    <footer className={styles.footer}>
      <div className={styles.footer__container}>
        <div className={styles.footer__container__row}>
          {data.map((item: any) => {
            const { title, navLinks } = item.fields;
            return (
              <div className={styles.footer__container__col}>
                <h4>{title}</h4>
                {navLinks.map((link: any) => {
                  const { title, linkUrl } = link.fields;
                  return (
                    <ul>
                      <li>
                        <a href={linkUrl}>{title}</a>
                      </li>
                    </ul>
                  );
                })}
              </div>
            );
          })}
          {/* ---------------------*/}
          {/* <div className={styles.footer__container__col}>
            <h4>company</h4>
            <ul>
              <li>
                <a href="#">about us</a>
              </li>
              <li>
                <a href="#">our services</a>
              </li>
              <li>
                <a href="#">privacy policy</a>
              </li>
              <li>
                <a href="#">affiliate program</a>
              </li>
            </ul>
          </div> */}
          {/* <div className={styles.footer__container__col}>
            <h4>get help</h4>
            <ul>
              <li>
                <a href="#">FAQ</a>
              </li>
              <li>
                <a href="#">shipping</a>
              </li>
              <li>
                <a href="#">returns</a>
              </li>
              <li>
                <a href="#">order status</a>
              </li>
              <li>
                <a href="#">payment options</a>
              </li>
            </ul>
          </div>
          <div className={styles.footer__container__col}>
            <h4>online shop</h4>
            <ul>
              <li>
                <a href="#">watch</a>
              </li>
              <li>
                <a href="#">bag</a>
              </li>
              <li>
                <a href="#">shoes</a>
              </li>
              <li>
                <a href="#">dress</a>
              </li>
            </ul>
          </div>  */}
          <div className={styles.footer__container__col}>
            <h4>follow us</h4>
            <div className={styles.social_links}>
              <a href="#">
                <FontAwesomeIcon
                  icon={faYoutube}
                  size="2x"
                  className={styles.youtube}
                />
              </a>
              <a href="#">
                <FontAwesomeIcon
                  icon={faFacebook}
                  size="2x"
                  className={styles.facebook}
                />
              </a>

              <a href="#">
                <FontAwesomeIcon
                  icon={faInstagram}
                  size="2x"
                  className={styles.instagram}
                />
              </a>
              <a href="#">
                <FontAwesomeIcon
                  icon={faTwitter}
                  size="2x"
                  className={styles.twitter}
                />
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
