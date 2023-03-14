/* eslint-disable react-hooks/rules-of-hooks */
import axios from "axios";
import React, { useEffect, useRef, useState } from "react";
import styles from "./EditAdvertisement.module.css";
import CheckIcon from "@mui/icons-material/Check";
import CloseIcon from "@mui/icons-material/Close";
import Image from "next/image";

type EditAdvertisementProps = {
  editModal: boolean;
  onClose: any;
  data: {
    adId: string;
    assetType: string;
    assetUrl: string;
    assetHeight: string;
    assetWidth: string;
    campaignName: string;
    id: string;
  };
  addata: any;
};

const EditAdvertisement = ({
  editModal,
  onClose,
  data,
  addata,
}: EditAdvertisementProps) => {
  if (!editModal) {
    return null;
  }
  const [adId, setAdId] = useState(data.adId);
  const [assetType, setAssetType] = useState(data.assetType);
  const [assetUrl, setAssetUrl] = useState(data.assetUrl);
  const [assetHeight, setAssetHeight] = useState(data.assetHeight);
  const [assetWidth, setAssetWidth] = useState(data.assetWidth);
  const [file, setFile] = useState<any>();
  const [buttonText, setButtonText] = useState("Upload File");
  const hiddenFileInput = useRef<HTMLInputElement>(null!);

  const selectFile = (e: any) => {
    e.preventDefault();
    setFile(e.target.files[0]);
  };
  const uploadFile = async (e: any) => {
    e.preventDefault();
    let { data } = await axios.post("/api/s3/uploadFile", {
      name: file.name,
      type: file.type,
    });
    const url = data.url;

    await axios
      .put(url, file, {
        headers: {
          "Content-Type": file.type,
          "Access-Control-Allow-Origin": "*",
        },
      })
      .then(() => {
        const imageUrl = url.split("?")[0];
        setAssetUrl(imageUrl);
        setButtonText("uploaded");
      })
      .catch((err) => {
        console.log(err);
      });
  };
  const handleFileInput = (e: any) => {
    e.preventDefault();
    hiddenFileInput.current.click();
  };
  const handleClick = async (e: any) => {
    e.preventDefault();

    await fetch("/api/AdvertizerProfile/Ads/editAds", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        data: {
          refId: sessionStorage.getItem("refId"),
          adId: adId,
          assetType: assetType,
          assetUrl: assetUrl,
          assetHeight: assetHeight,
          assetWidth: assetWidth,
          id: data.id,
          campaignName: data.campaignName,
          oldUrl: data.assetUrl,
        },
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        setFile(null);
        addata(true);
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
          <h4>Edit AD</h4>
          <CloseIcon onClick={onClose} className={styles.close_icon} />
        </div>
        <div className={styles.modal_body}>
          <form>
            <div className={styles.form__input}>
              <label className={styles.form__input__label}>Ad Id</label>
              <input
                type="text"
                placeholder="AD ID"
                name="adId"
                value={adId}
                onChange={(e) => setAdId(e.target.value)}
              />
            </div>
            <div className={styles.form__input}>
              <label className={styles.form__input__label}>Asset Type</label>
              <input
                type="text"
                placeholder="Asset Type"
                name="assetType"
                value={assetType}
                onChange={(e) => setAssetType(e.target.value)}
              />
            </div>
            <div className={styles.form__input}>
              <label className={styles.form__input__label}>Asset</label>
              <input
                type="file"
                placeholder="Asset Url"
                name="assetUrl"
                onChange={(e) => selectFile(e)}
                style={{ display: "none" }}
                ref={hiddenFileInput}
                accept="image/*,video/*"
              />
              <button
                onClick={(e) => handleFileInput(e)}
                className={styles.modal_button_asset}
              >
                Pick AD Image/Video
              </button>
              {file ? (
                <div className={styles.preview}>
                  <Image
                    src={URL.createObjectURL(file)}
                    className={styles.image}
                    alt="Thumb"
                    width={320}
                    height={220}
                  />
                  <button
                    onClick={(e) => uploadFile(e)}
                    className={styles.modal_button}
                  >
                    {buttonText == "uploaded" ? <CheckIcon /> : "Upload"}
                  </button>
                </div>
              ) : (
                <div className={styles.preview}>
                  <Image src={assetUrl} alt="Thumb" width={320} height={220} />
                  <button
                    onClick={(e) => uploadFile(e)}
                    className={styles.modal_button}
                  >
                    {buttonText == "uploaded" ? <CheckIcon /> : "Upload"}
                  </button>
                </div>
              )}
            </div>
            <div className={styles.form__input}>
              <label className={styles.form__input__label}>Asset Height</label>
              <input
                type="text"
                placeholder="Asset Height"
                name="assetHeight"
                value={assetHeight}
                onChange={(e) => setAssetHeight(e.target.value)}
              />
            </div>
            <div className={styles.form__input_last}>
              <label className={styles.form__input__label}>Asset Width</label>
              <input
                type="text"
                placeholder="Asset Width"
                name="assetWidth"
                value={assetWidth}
                onChange={(e) => setAssetWidth(e.target.value)}
              />
            </div>
          </form>
        </div>
        <div className={styles.modal_footer}>
          <button className={styles.modal_button} onClick={handleClick}>
            Edit Ad
          </button>
          <button className={styles.modal_button} onClick={onClose}>
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

export default EditAdvertisement;
