/* eslint-disable react-hooks/rules-of-hooks */
import React, { useState } from "react";
import styles from "./EditPage.module.css";
import CloseIcon from "@mui/icons-material/Close";

type EditPageProps = {
  editshow: boolean;
  onClose: any;
  data: { pageName: string; pageUrl: string; id: string };
  pageData: any;
};
const EditPage = ({ editshow, onClose, data, pageData }: EditPageProps) => {
  if (!editshow) {
    return null;
  }
  const [pageName, setPageName] = useState(data.pageName);
  const [pageUrl, setPageUrl] = useState(data.pageUrl);

  const handleClick = async (e: any) => {
    e.preventDefault();
    await fetch("/api/PublisherProfile/Webpages/EditPage", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        data: {
          refId: sessionStorage.getItem("refId"),
          pageName: pageName,
          pageUrl: pageUrl,
          id: data.id,
        },
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        pageData(true);
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
          <h4>Edit Page</h4>
          <CloseIcon onClick={onClose} className={styles.close_icon} />
        </div>
        <div className={styles.modal_body}>
          <form>
            <div className={styles.form__input}>
              <label className={styles.form__input__label}>Page Name</label>
              <input
                type="text"
                placeholder="Page Name"
                name="pageName"
                value={pageName}
                onChange={(e) => setPageName(e.target.value)}
              />
            </div>
            <div className={styles.form__input_last}>
              <label className={styles.form__input__label}>Page Url</label>
              <input
                type="text"
                placeholder="Page Url"
                name="pageUrl"
                value={pageUrl}
                onChange={(e) => setPageUrl(e.target.value)}
              />
            </div>
          </form>
        </div>
        <div className={styles.modal_footer}>
          <button className={styles.modal_button} onClick={handleClick}>
            Edit Page
          </button>
          <button className={styles.modal_button} onClick={onClose}>
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

export default EditPage;
