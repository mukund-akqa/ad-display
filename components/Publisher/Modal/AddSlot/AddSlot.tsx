import React, { useState } from "react";
import styles from "./AddSlot.module.css";
import { Alert } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import { Close } from "@mui/icons-material";

type AddSlotProps = {
  show: boolean;
  onClose: any;
  pageName: string;
  slotData: any;
};

const AddSlot = ({ show, onClose, pageName, slotData }: AddSlotProps) => {
  const [slotId, setSlotId] = useState("");
  const [slotHeight, setSlotHeight] = useState("");
  const [slotWidth, setSlotWidth] = useState("");
  const [error, setError] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  if (!show) {
    return null;
  }

  const handleClick = async (e: any) => {
    if (slotId == "" || slotHeight == "" || slotWidth == "") {
      setError(true);
      setErrorMessage("Data not entered");
    } else {
      e.preventDefault();
      await fetch("/api/PublisherProfile/Slots/addSlot", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          data: {
            refId: sessionStorage.getItem("refId"),
            pageName: pageName,
            slotId: slotId,
            slotHeight: slotHeight,
            slotWidth: slotWidth,
          },
        }),
      }).then((res) => {
        if (res.status === 200) {
          res.json().then((data) => {
            slotData(true);
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
    setError(false);
    setSlotId("");
    setSlotHeight("");
    setSlotWidth("");
  };
  return (
    <div className={styles.modal} onClick={handleModel}>
      <div
        className={styles.modal_content}
        onClick={(e) => e.stopPropagation()}
      >
        <div className={styles.modal_header}>
          <h4>Add Slot</h4>
          <CloseIcon onClick={handleModel} className={styles.close_icon} />
        </div>
        <div className={styles.modal_body}>
          <form>
            <div className={styles.form__input}>
              <label className={styles.form__input__label}>AD Slot ID</label>
              <input
                type="text"
                placeholder="AD Slot ID"
                name="slotid"
                value={slotId}
                onChange={(e) => setSlotId(e.target.value)}
                required
              />
            </div>
            <div className={styles.form__input}>
              <label className={styles.form__input__label}>Height</label>
              <input
                type="text"
                placeholder="Height"
                name="height"
                value={slotHeight}
                onChange={(e) => setSlotHeight(e.target.value)}
                required
              />
            </div>
            <div className={styles.form__input_last}>
              <label className={styles.form__input__label}>Width</label>
              <input
                type="text"
                placeholder="Width"
                name="width"
                value={slotWidth}
                onChange={(e) => setSlotWidth(e.target.value)}
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
            Add Slot
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

export default AddSlot;
