import React, { useState } from "react";
import { mutate } from "swr";
import styles from "./AddAdvertizer.module.css";
import CloseIcon from "@mui/icons-material/Close";
import { Alert } from "@mui/material";
type AddAdvertizerProps = {
  showAdvertizer: boolean;
  onClose: any;
  Includedata: any;
};

const AddAdvertizer = ({
  showAdvertizer,
  onClose,
  Includedata,
}: AddAdvertizerProps) => {
  const [advertizer, setAdvertizer] = useState("");
  const [error, setError] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  if (!showAdvertizer) {
    return null;
  }
  const handleClick = async (e: any) => {
    e.preventDefault();
    await fetch("/api/PublisherProfile/IncludeAdvertizer/addAdvertizer", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        data: {
          refId: sessionStorage.getItem("refId"),
          advertizer: advertizer,
        },
      }),
    })
      //   .then((res) => res.json())
      //   .then((data) => {
      //     console.log(data);
      //     Includedata(true);
      //     setAdvertizer("");
      //   });
      // onClose();
      .then((res) => {
        if (res.status === 200) {
          res.json().then((data) => {
            console.log(data);
            Includedata(true);
            handleModel();
          });
        } else {
          res.json().then((data) => {
            setError(true);
            setErrorMessage(data.error);
          });
        }
      });
  };
  const handleModel = () => {
    onClose();
    setAdvertizer("");
    setError(false);
  };
  return (
    <div className={styles.modal} onClick={handleModel}>
      <div
        className={styles.modal_content}
        onClick={(e) => e.stopPropagation()}
      >
        <div className={styles.modal_header}>
          <h4>Include Advertizer</h4>
          <CloseIcon onClick={handleModel} className={styles.close_icon} />
        </div>
        <div className={styles.modal_body}>
          <form>
            <div className={styles.form__input_last}>
              <label className={styles.form__input__label}>
                Add advertizer
              </label>
              <input
                type="text"
                placeholder="ADD advertizer"
                name=""
                value={advertizer}
                onChange={(e) => setAdvertizer(e.target.value)}
              />
            </div>

            {/* <button className={styles.modal_button} onClick={handleClick}>
              Include
            </button> */}
          </form>
        </div>
        <div className={styles.modal_footer}>
          <button
            className={styles.modal_button}
            onClick={(e) => handleClick(e)}
          >
            Include
          </button>
          <button className={styles.modal_button} onClick={handleModel}>
            Close
          </button>
        </div>
        {error && <Alert severity="error">{errorMessage}</Alert>}
      </div>
    </div>
  );
};

export default AddAdvertizer;
