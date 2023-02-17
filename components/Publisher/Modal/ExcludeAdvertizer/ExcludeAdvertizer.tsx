import React, { useState } from "react";
import styles from "./ExcludeAdvertizer.module.css";

import CloseIcon from "@mui/icons-material/Close";
type AddAdvertizerProps = {
  showExcludedAdvertizer: boolean;
  onClose: any;
  Excludedata:any
};

const ExcludeAdvertizer = ({
  showExcludedAdvertizer,
  onClose,
  Excludedata
}: AddAdvertizerProps) => {
  const [advertizer, setAdvertizer] = useState("");
  if (!showExcludedAdvertizer) {
    return null;
  }
  const handleClick = async (e: any) => {
    e.preventDefault();
    await fetch("/api/PublisherProfile/ExcludeAdvertizer/excludeAdvertizer", {
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
        Excludedata(true)
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
          <h4>Exclude Advertizer</h4>
          <CloseIcon onClick={onClose} className={styles.close_icon} />
        </div>
        <div className={styles.modal_body}>
          <form>
            <div className={styles.form__input_last}>
              <input
                type="text"
                placeholder="ADD advertizer"
                name=""
                value={advertizer}
                onChange={(e) => setAdvertizer(e.target.value)}
              />
            </div>

            {/* <button className={styles.modal_button} onClick={handleClick}>
              Exclude
            </button> */}
          </form>
        </div>
        <div className={styles.modal_footer}>
          <button className={styles.modal_button} onClick={(e)=>handleClick(e)}>
            Exclude
          </button>
          <button className={styles.modal_button} onClick={onClose}>
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

export default ExcludeAdvertizer;
