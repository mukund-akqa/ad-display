// import {
//   ContentfulCollection,
//   createClient,
//   Entry,
//   EntryCollection,
// } from "contentful";
// import ContentService from "../../src/util/content-service";
// import { GetStaticProps, NextPage } from "next";
// import React, { useEffect, useState } from "react";
// import { updateComputedPropertyName } from "typescript";
// import { IFooterFields } from "../../@types/generated/contentful";
// import styles from "./Footer.module.css";
// import { ParsedUrlQuery } from "querystring";

// interface Props {
//   footerData: IFooterFields[];
// }

// const Footer = () => {
//   return (
//     <>
//       <footer className={styles.footer}>
//         <div className={styles.footer_container}>
//           <div className={styles.footer_container_row}>
//             <div className={styles.footer_container_column}>
//               <p className={styles.footer_heading_link}>About Us</p>
//               <a href="#" className="footer_link">
//                 footer_link_1
//               </a>
//               <a href="#" className="footer_link">
//                 footer_link_2
//               </a>
//               <a href="#" className="footer_link">
//                 footer_link_3
//               </a>
//             </div>
//             <div className={styles.footer_container_column}>
//               <p className="footer_heading_link">Services</p>
//               <a href="#" className="footer_link">
//                 footer_link_services
//               </a>
//               <a href="#" className="footer_link">
//                 footer_link_services
//               </a>
//               <a href="#" className="footer_link">
//                 footer_link_services
//               </a>
//             </div>
//             <div className={styles.footer_container_column}>
//               <p className="footer_heading_link">Contact US</p>
//               <a href="#" className="footer_link">
//                 footer_link_contactus
//               </a>
//               <a href="#" className="footer_link">
//                 footer_link_contactus
//               </a>
//               <a href="#" className="footer_link">
//                 footer_link_contactus
//               </a>
//             </div>
//             <div className={styles.footer_container_column}>
//               <p className={styles.footer_heading_link}>Social Media</p>
//               <a href="#" className="footer_link">
//                 footer_link_Social_Media
//               </a>
//               <a href="#" className="footer_link">
//                 footer_link_SocialMedia
//               </a>
//               <a href="#" className="footer_link">
//                 footer_link_SocilaMedia
//               </a>
//               <a href="#" className="footer_link">
//                 footer_link_SocialMedia
//               </a>
//               <a href="#" className="footer_link">
//                 footer_link_SocilaMedia
//               </a>
//             </div>
//           </div>
//           <div className={styles.footer_copywrite}>
//             <p>&copy;2023 AdXchange</p>
//             <p>Made with ♥ in India</p>
//           </div>
//         </div>
//       </footer>
//     </>
//   );
// };

// export default Footer;

// const [results,setResults]=useState<null | EntryCollection<IFooterFields>>(null!)

// const client = createClient({
//         space: "zx1oww7gzayd",
//         accessToken: "CCGg1vBRSts9iCobYeGq1Co7S510rlz5v-F3EB55GG8",
//       });
// useEffect(()=>{
//     client.getEntries<IFooterFields>({
//         content_type:'footer'
//     })
//     .then((res)=>{
//         console.log(res.items)
//         setResults(res)

//     })
//     .catch((error)=>console.error(error))
// },[])

// if(results && results.items.length > 0){
//     const {fields} =results.items[0]
//     const {footerHeadingTitle,footerLinks}=fields
//     if(footerHeadingTitle && footerLinks){
//         return (
//             <footer className={styles.footer}>
//       <div className={styles.footer_container}>
//         <div className={styles.footer_container_row}>
//           <div className={styles.footer_container_column}>
//           <p className={styles.footer_heading_link}>{footerHeadingTitle}</p>
//           {footerLinks.map((link)=>{
//             <a href="#" className="footer_link">
//             {link}
//           </a>
//           })}

//           </div>
//           </div>
//           </div>
//           </footer>
//         )
//     }
// }

// export async function getStaticProps() {
//   const client = createClient({
//     space: "zx1oww7gzayd",
//     accessToken: "CCGg1vBRSts9iCobYeGq1Co7S510rlz5v-F3EB55GG8",
//   });
//   const res = await client.getEntries<EntryCollection<IFooterFields>>({ content_type: "footer" });
//   return {
//     props: {
//       footer: res.items,
//     },
//   };
// }
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faYoutube,
  faFacebook,
  faTwitter,
  faInstagram,
} from "@fortawesome/free-brands-svg-icons";

import React from "react";
import styles from "./Footer.module.css";

const Footer = () => {
  return (
    <footer className={styles.footer}>
      <div className={styles.footer__container}>
        <div className={styles.footer__container__row}>
          <div className={styles.footer__container__col}>
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
          </div>
          <div className={styles.footer__container__col}>
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
          </div>
          <div className={styles.footer__container__col}>
            <h4>follow us</h4>
            <div className={styles.social_links}>
              <a href="#" >
			  	<FontAwesomeIcon icon={faYoutube} size="2x" className={styles.youtube}/>
              </a>
              <a href="#" >
                <FontAwesomeIcon icon={faFacebook} size="2x" className={styles.facebook}/>
              </a>

              <a href="#" >
                <FontAwesomeIcon icon={faInstagram} size="2x" className={styles.instagram}/>
              </a>
              <a href="#" >
                <FontAwesomeIcon icon={faTwitter} size="2x" className={styles.twitter}/>
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
