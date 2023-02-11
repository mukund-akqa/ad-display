import Image from "next/image";
import React, { useEffect, useState } from "react";
import { TypeFlags } from "typescript";
import styles from "./UserProfile.module.css";
import Profile from "../../public/Profile.jpg";
import Link from "next/link";
import card4 from "../../public/card4.jpg";
import { useRouter } from "next/router";

const UserProfile = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [siteName,setSiteName] = useState("")
  const router = useRouter();

  useEffect(() => {
    fetch("/api/UserProfile/getUser", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        data: {
          refId: sessionStorage.getItem("refId"),
        },
      }),
    })
      .then((data) => data.json())
      .then((data) => {
        setName(data.userData.name);
        setEmail(data.userData.email);
        setPhone(data.userData.phone);
        setSiteName(data.userData.siteName)
      });
  }, []);
  const handleUpdate = async (e:React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    await fetch("/api/UserProfile/updateUser", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        data: {
          name: name,
          email: email,
          phone: phone,
          siteName:siteName,
          refId: sessionStorage.getItem("refId"),
        },
      }),
    }).then((res) => {
        res.json().then((data) => {
          console.log(data.name);
          console.log("account page");
        });
      })
      .catch((e) => console.log(e));
      router.push('/account')
  };
  return (
    <div className={styles.userProfile}>
      <div className={styles.form__container}>
        <div className={styles.form__container__left}>
          <h1 className={styles.form__container__title}>Profile</h1>
          <form onSubmit={handleUpdate}>
            <div className={styles.form__input}>
              <label>Name</label>
              <input
                type="text"
                placeholder="Name"
                name="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </div>
            <div className={styles.form__input}>
            <label>Email</label>
              <input
                type="email"
                placeholder="Email"
                name="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div className={styles.form__input}>
            <label>Phone</label>
              <input
                type="text"
                placeholder="Phone"
                name="phone"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
              />
            </div>
            <div className={styles.form__input}>
            <label>Site</label>
              <input
                type="text"
                placeholder="Site Name"
                name="siteName"
                value={siteName}
                onChange={(e) => setSiteName(e.target.value)}
              />
            </div>

            <button className={styles.form__button} type="submit">
              Update
            </button>
          </form>
        </div>
        {/* <Image src={Profile} alt="form" className={styles.form__image} /> */}
      </div>
    </div>
  );
};

export default UserProfile;
