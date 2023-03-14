/* eslint-disable react-hooks/rules-of-hooks */
import React, { useState } from "react";
import styles from "./EditCampaign.module.css";
import CloseIcon from "@mui/icons-material/Close";
type EditCampaignProps = {
  editModalCampaign: boolean;
  onClose: any;
  data: {
    campaignName: string;
    landingPageUrl: string;
    id: string;
  };
  campdata: any;
};

const EditCampaign = ({
  editModalCampaign,
  onClose,
  data,
  campdata,
}: EditCampaignProps) => {
  if (!editModalCampaign) {
    return null;
  }
  const [campaignName, setCampaignName] = useState(data.campaignName);
  const [landingPageUrl, setLandingPageUrl] = useState(data.landingPageUrl);

  const handleClick = async (e: any) => {
    e.preventDefault();
    await fetch("/api/AdvertizerProfile/Campaign/editCampaign", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        data: {
          refId: sessionStorage.getItem("refId"),
          campaignName: campaignName,
          landingPageUrl: landingPageUrl,
          id: data.id,
        },
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        campdata(true);
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
          <h4>Edit Campaign</h4>
          <CloseIcon onClick={onClose} className={styles.close_icon} />
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
              />
            </div>
          </form>
        </div>
        <div className={styles.modal_footer}>
          <button className={styles.modal_button} onClick={handleClick}>
            Edit Campaign
          </button>
          <button className={styles.modal_button} onClick={onClose}>
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

export default EditCampaign;
