/* eslint-disable react-hooks/rules-of-hooks */
import React, { useState } from "react";
import styles from "./EditSlot.module.css";
import CloseIcon from "@mui/icons-material/Close";
type EditSlotProps = {
  editModal: boolean;
  onClose: any;
  data: {
    slotId: string;
    slotHeight: string;
    slotWidth: string;
    id: string;
    pageName: string;
  };
  slotData: any;
};

const EditSlot = ({ editModal, onClose, data, slotData }: EditSlotProps) => {
  if (!editModal) {
    return null;
  }
  const [slotId, setSlotId] = useState(data.slotId);
  const [slotHeight, setSlotHeight] = useState(data.slotHeight);
  const [slotWidth, setSlotWidth] = useState(data.slotWidth);

  const handleClick = async (e: any) => {
    e.preventDefault();

    await fetch("/api/PublisherProfile/Slots/EditSlot", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        data: {
          refId: sessionStorage.getItem("refId"),
          slotId: slotId,
          slotHeight: slotHeight,
          slotWidth: slotWidth,
          id: data.id,
          pageName: data.pageName,
        },
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        slotData(true);
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
          <h4>Edit Slot</h4>
          <CloseIcon onClick={onClose} className={styles.close_icon} />
        </div>
        <div className={styles.modal_body}>
          <form>
            <div className={styles.form__input}>
              <label className={styles.form__input__label}>Ad Slot ID</label>
              <input
                type="text"
                placeholder="Ad Slot ID"
                name="slotid"
                value={slotId}
                onChange={(e) => setSlotId(e.target.value)}
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
          <button className={styles.modal_button} onClick={onClose}>
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

export default EditSlot;
