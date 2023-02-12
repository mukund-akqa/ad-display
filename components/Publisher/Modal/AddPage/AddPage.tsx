import { style } from "@mui/system";
import React, { useEffect, useState } from "react";
import styles from "./AddPage.module.css";
import { Alert } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";

type AddPageProps = {
  show: boolean;
  onClose: any;
  // error: boolean;
  // errorMessage: string;
};
const AddPage = ({ show, onClose }: AddPageProps) => {
  const [pageName, setPageName] = useState("");
  const [pageUrl, setPageUrl] = useState("");
  const [error, setError] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  if (!show) {
    return null;
  }

  const handleClick = async (e: any) => {
    e.preventDefault();
    await fetch("/api/PublisherProfile/Webpages/addPage", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        data: {
          refId: sessionStorage.getItem("refId"),
          pageName: pageName,
          pageUrl: pageUrl,
        },
      }),
    }).then((res) => {
      if (res.status === 200) {
        res.json().then((data) => {
          console.log(data);
          onClose();
          setPageName("");
          setPageUrl("");
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
    setError(false);
  };
  return (
    <div className={styles.modal} onClick={handleModel}>
      <div
        className={styles.modal_content}
        onClick={(e) => e.stopPropagation()}
      >
        <div className={styles.modal_header}>
          <h4>Add Page</h4>
          <CloseIcon onClick={onClose} className={styles.close_icon} />
        </div>
        <div className={styles.modal_body}>
          <form>
            <div className={styles.form__input}>
              <label>Page Name</label>
              <input
                type="text"
                placeholder="Page Name"
                name="pageName"
                value={pageName}
                onChange={(e) => setPageName(e.target.value)}
              />
            </div>
            <div className={styles.form__input_last}>
              <label>Page Url</label>
              <input
                type="text"
                placeholder="Page Url"
                name="pageUrl"
                value={pageUrl}
                onChange={(e) => setPageUrl(e.target.value)}
              />
            </div>

            {/* <button className={styles.modal_button} onClick={handleClick}>
              Add
            </button> */}
          </form>
        </div>
        <div className={styles.modal_footer}>
          <button className={styles.modal_button} onClick={(e)=>handleClick(e)}>
            Add Page
          </button>
          <button className={styles.modal_button} onClick={onClose}>
            Close
          </button>
        </div>
        {error && <Alert severity="error">{errorMessage}</Alert>}
      </div>
    </div>
  );
};

export default AddPage;
