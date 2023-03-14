import React, { useEffect, useState } from "react";
import styles from "./Footer.module.css";
import { client as c } from "../../utils/contentfulClient";

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
        const footerlinks = entry.items[0].fields.footerLinks;
        setData(footerlinks);
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
        setSocialData(entry.items[0].fields);
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
          {data.map((item: any,i:number) => {
            const { title, navLinks } = item.fields;
            return (
              <div className={styles.footer__container__col} key={i}>
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
          <div className={styles.footer__container__col}>
            <h4>{socialData?.title}</h4>

            <div className={styles.social_links}>
              {socialData?.socialIcon.map((item: any,i:number) => {
                return (
                  <a href={item.fields.url} key={i}>
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
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
