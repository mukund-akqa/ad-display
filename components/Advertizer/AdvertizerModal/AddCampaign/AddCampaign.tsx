/* eslint-disable react-hooks/rules-of-hooks */
import React, { useState } from "react";
import styles from "./AddCampaign.module.css";
import { Alert } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";

type AddCampaignProps = {
  showCampaign: boolean;
  onClose: any;
  campdata: any;
};

const AddCampaign = ({ showCampaign, onClose, campdata }: AddCampaignProps) => {
  if (!showCampaign) {
    return null;
  }
  const [campaignName, setCampaignName] = useState("");
  const [landingPageUrl, setLandingPageUrl] = useState("");
  const [error, setError] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const handleClick = async (e: any) => {
    if (campaignName === "" || landingPageUrl === "") {
      setError(true);
      setErrorMessage("Data not entered");
    } else {
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
            console.log("addData", data);
            console.log(data.campaign);
            campdata(true);
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
    }
  };

  const handleModel = () => {
    onClose();
    setError(false);
    setCampaignName("");
    setLandingPageUrl("");
  };

  return (
    <div className={styles.modal} onClick={handleModel}>
      <div
        className={styles.modal_content}
        onClick={(e) => e.stopPropagation()}
      >
        <div className={styles.modal_header}>
          <h4>Add Campaign</h4>
          <CloseIcon onClick={handleModel} className={styles.close_icon} />
        </div>
        <div className={styles.modal_body}>
          <form>
            <div className={styles.form__input}>
              <label className={styles.form__input__label}>Campaign Name</label>
              <input
                type="text"
                placeholder="Campaign Name"
                name="campaignName"
                value={campaignName}
                onChange={(e) => setCampaignName(e.target.value)}
                required
              />
            </div>
            <div className={styles.form__input_last}>
              <label className={styles.form__input__label}>
                Landing Page Url
              </label>
              <input
                type="text"
                placeholder="Landing Page Url"
                name="landingPageUrl"
                value={landingPageUrl}
                onChange={(e) => setLandingPageUrl(e.target.value)}
                required
              />
            </div>
            {/* {error && <Alert severity="error">{errorMessage}</Alert>}
            <button className={styles.modal_button} onClick={handleClick}>
              Add
            </button> */}
          </form>
        </div>
        <div className={styles.modal_footer}>
          <button
            className={styles.modal_button}
            onClick={(e) => handleClick(e)}
          >
            Add Campaign
          </button>
          {/* <button className={styles.modal_button} onClick={onClose}>
            Close
          </button> */}
          <button className={styles.modal_button} onClick={handleModel}>
            Close
          </button>
        </div>
        {error && <Alert severity="error">{errorMessage}</Alert>}
      </div>
    </div>
  );
};

export default AddCampaign;
