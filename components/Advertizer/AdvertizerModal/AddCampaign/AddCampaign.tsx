/* eslint-disable react-hooks/rules-of-hooks */
import React, { useState } from "react";
import styles from "./AddCampaign.module.css";
import { Alert } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";

type AddCampaignProps = {
  showCampaign: boolean;
  onClose: any;
};

const AddCampaign = ({ showCampaign, onClose }: AddCampaignProps) => {
  if (!showCampaign) {
    return null;
  }
  const [campaignName, setCampaignName] = useState("");
  const [landingPageUrl, setLandingPageUrl] = useState("");
  const [error, setError] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const handleClick = async (e: any) => {
    console.log(landingPageUrl);
    e.preventDefault();
    await fetch("/api/AdvertizerProfile/Campaign/addCampaign", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        data: {
          refId: sessionStorage.getItem("refId"),
          campaignName: campaignName,
          landingPageUrl: landingPageUrl,
        },
      }),
    }).then((res) => {
      if (res.status === 200) {
        res.json().then((data) => {
          console.log(data);
          onClose();
          setCampaignName("");
          setLandingPageUrl("");
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
          <h4>Add Campaign</h4>
          <CloseIcon onClick={onClose} className={styles.close_icon} />
        </div>
        <div className={styles.modal_body}>
          <form>
            <div className={styles.form__input}>
              <label>Campaign Name</label>
              <input
                type="text"
                placeholder="Campaign Name"
                name="campaignName"
                value={campaignName}
                onChange={(e) => setCampaignName(e.target.value)}
              />
            </div>
            <div className={styles.form__input_last}>
              <label>Landing Page Url</label>
              <input
                type="text"
                placeholder="Landing Page Url"
                name="landingPageUrl"
                value={landingPageUrl}
                onChange={(e) => setLandingPageUrl(e.target.value)}
              />
            </div>
            {/* {error && <Alert severity="error">{errorMessage}</Alert>}
            <button className={styles.modal_button} onClick={handleClick}>
              Add
            </button> */}
          </form>
        </div>
        <div className={styles.modal_footer}>
          <button className={styles.modal_button} onClick={(e)=>handleClick(e)}>
            Add Campaign
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

export default AddCampaign;
