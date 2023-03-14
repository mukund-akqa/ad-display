import React, { useEffect, useState } from "react";
import styles from "./UserProfile.module.css";
import { useRouter } from "next/router";
import Spinner from "../Spinner/Spinner";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const UserProfile = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [siteName, setSiteName] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();
  const notify = () =>
    toast.success("profile updated successfully", {
      autoClose: 1000,
    });
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
        setSiteName(data.userData.siteName);
      });
  }, []);
  const handleUpdate = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);
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
          siteName: siteName,
          refId: sessionStorage.getItem("refId"),
        },
      }),
    })
      .then((res) => {
        res.json().then((data) => {
          setIsLoading(false);
          notify();
        });
      })
      .catch((e) => console.log(e));
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

            <button
              className={styles.form__button}
              type="submit"
              disabled={isLoading}
            >
              Update
            </button>
            {isLoading && <Spinner />}
          </form>
          <ToastContainer />
        </div>
      </div>
    </div>
  );
};

export default UserProfile;
