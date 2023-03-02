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

const Footer = () => {
  const [data, setData] = useState<any>([]);
  const [socialData, setSocialData] = useState<any>();

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
  const social = async () => {
    await c
      .getEntries({
        content_type: "socialMedia",
        limit: 2,
        include: 10,
      })
      .then((entry: any) => {
        console.log(entry);

        setSocialData(entry.items[0].fields);
        const { title, socialIcon } = entry.items[0].fields;
        // console.log(title);
        // console.log(socialIcon);
        socialIcon.map((item: any) => {
          // console.log(item.fields.title);
          // console.log(item.fields.url);
          console.log(item.fields.icon.fields.file.url);
        });

        /*  console.log(entry.)*/
      });
  };

  useEffect(() => {
    fdata();
    social();
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
            {/* <h4>follow us</h4>
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
              </a> */}
            <h4>{socialData?.title}</h4>

            <div className={styles.social_links}>
              {socialData?.socialIcon.map((item: any) => {
                console.log(item.fields.icon.fields.file.url);
                return (
                  <a href={item.fields.url}>
                    <img
                      src={item.fields.icon.fields.file.url}
                      alt="contentful"
                      height={30}
                      width={30}
                    ></img>
                  </a>
                );
              })}
            </div>

            {/* <img src={youtube.src} alt="youtbe" width={50} height={50} /> */}
            {/* </div> */}
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
