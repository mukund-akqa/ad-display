/* eslint-disable react-hooks/rules-of-hooks */
import React, { useRef, useState } from "react";
import styles from "./AddAdvertisement.module.css";
import { Alert } from "@mui/material";
import axios from "axios";
import CheckIcon from "@mui/icons-material/Check";
import CloseIcon from "@mui/icons-material/Close";
import Image from "next/image";

type AddAdvertisementProps = {
  addModal: boolean;
  campaignName: string;
  onClose: any;
  addata: any;
};

const AddAdvertisement = ({
  addModal,
  campaignName,
  onClose,
  addata,
}: AddAdvertisementProps) => {
  if (!addModal) {
    return null;
  }
  const [adId, setAdId] = useState("");
  const [assetType, setAssetType] = useState("");
  const [assetUrl, setAssetUrl] = useState("");
  const [assetHeight, setAssetHeight] = useState("");
  const [assetWidth, setAssetWidth] = useState("");
  const [error, setError] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [buttonText, setButtonText] = useState("Upload File");
  const hiddenFileInput = useRef<HTMLInputElement>(null!);

  const [file, setFile] = useState<any>();

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
    if (
      adId == "" ||
      assetHeight == "" ||
      assetWidth == "" ||
      assetType == "" ||
      file == null
    ) {
      setError(true);
      setErrorMessage("Data not entered");
    } else {
      e.preventDefault();
      await fetch("/api/AdvertizerProfile/Ads/addAds", {
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
            campaignName: campaignName,
          },
        }),
      }).then((res) => {
        if (res.status === 200) {
          res.json().then((data) => {
            handleModel()
            addata(true);
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
    setAdId("");
    setAssetType("");
    setAssetUrl("");
    setAssetHeight("");
    setAssetWidth("");
    setFile(null);
    setError(false);
  };

  return (
    <div className={styles.modal} onClick={handleModel}>
      <div
        className={styles.modal_content}
        onClick={(e) => e.stopPropagation()}
      >
        <div className={styles.modal_header}>
          <h4>Add AD</h4>
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
                required
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
                required
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
                required
              />
              <button
                onClick={(e) => handleFileInput(e)}
                className={styles.modal_button_asset}
              >
                Pick AD Image/Video
              </button>
              {file && (
                <div className={styles.preview}>
                  <Image
                    src={URL.createObjectURL(file)}
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
                required
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
                required
              />
            </div>
          </form>
        </div>
        <div className={styles.modal_footer}>
          <button
            className={styles.modal_button}
            onClick={(e) => handleClick(e)}
          >
            Add Ad
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

export default AddAdvertisement;
