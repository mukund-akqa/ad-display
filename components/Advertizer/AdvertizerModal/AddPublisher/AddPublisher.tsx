/* eslint-disable react-hooks/rules-of-hooks */
import React, { useState } from "react";
import styles from "./AddPublisher.module.css";
import CloseIcon from "@mui/icons-material/Close";
type AddPublisherProps = {
  showIncludedPublisher: boolean;
  onClose: any;
  Includedata:any
};

const AddPublisher = ({
  showIncludedPublisher,
  onClose,
  Includedata
}: AddPublisherProps) => {
  
  if (!showIncludedPublisher) {
    return null;
  }
  const [publisher, setPublisher] = useState("");

  const handleClick = async (e: any) => {
    e.preventDefault();
    await fetch("/api/AdvertizerProfile/IncludePublisher/addPublisher", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        data: {
          refId: sessionStorage.getItem("refId"),
          publisher: publisher,
        },
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        Includedata(true)
      });
    onClose();
  };

  return (
    <div className={styles.modal} onClick={onClose}>
      <div
        className={styles.modal_content}
        onClick={(e) => e.stopPropagation()}
      >
        <div className={styles.modal_header}>
          <h4>Include Publisher</h4>
          <CloseIcon onClick={onClose} className={styles.close_icon} />
        </div>
        <div className={styles.modal_body}>
          <form>
            <div className={styles.form__input_last}>
              <label>Publisher</label>
              <input
                type="text"
                placeholder="Publisher"
                name=""
                value={publisher}
                onChange={(e) => setPublisher(e.target.value)}
              />
            </div>

            {/* <button className={styles.modal_button} onClick={handleClick}>
              Include
            </button> */}
          </form>
        </div>
        <div className={styles.modal_footer}>
          <button className={styles.modal_button} onClick={handleClick}>
            Include
          </button>
          <button className={styles.modal_button} onClick={onClose}>
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

export default AddPublisher;
