import React, { useState } from "react";
import styles from "./ExcludeAdvertizer.module.css";
import { Alert } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
type AddAdvertizerProps = {
  showExcludedAdvertizer: boolean;
  onClose: any;
  Excludedata: any;
};

const ExcludeAdvertizer = ({
  showExcludedAdvertizer,
  onClose,
  Excludedata,
}: AddAdvertizerProps) => {
  const [advertizer, setAdvertizer] = useState("");
  const [error, setError] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  if (!showExcludedAdvertizer) {
    return null;
  }
  const handleClick = async (e: any) => {
    if (advertizer === "") {
      setError(true);
      setErrorMessage("Data not entered");
    } else {
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
      }).then((res) => {
        if (res.status === 200) {
          res.json().then((data) => {
            Excludedata(true);
            handleModel();
          });
        } else {
          res.json().then((data) => {
            setError(true);
            setErrorMessage(data.error);
          });
        }
      });
    }
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
          <h4>Exclude Advertizer Domain</h4>
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
          </form>
        </div>
        <div className={styles.modal_footer}>
          <button
            className={styles.modal_button}
            onClick={(e) => handleClick(e)}
          >
            Exclude
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

export default ExcludeAdvertizer;
