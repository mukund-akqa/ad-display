import React, { useState } from "react";
import { mutate } from "swr";
import styles from "./AddAdvertizer.module.css";
import CloseIcon from "@mui/icons-material/Close";

type AddAdvertizerProps = {
  showAdvertizer: boolean;
  onClose: any;
  Includedata :any 
};

const AddAdvertizer = ({ showAdvertizer, onClose, Includedata}: AddAdvertizerProps) => {
  const [advertizer, setAdvertizer] = useState("");
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
          <h4>Include Advertizer</h4>
          <CloseIcon onClick={onClose} className={styles.close_icon} />
        </div>
        <div className={styles.modal_body}>
          <form>
            <div className={styles.form__input_last}>
              <label>Add advertizer</label>
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
          <button className={styles.modal_button} onClick={(e)=>handleClick(e)}>
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

export default AddAdvertizer;
