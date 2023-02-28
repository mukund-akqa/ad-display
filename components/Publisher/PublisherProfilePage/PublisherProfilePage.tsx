import { style } from "@mui/system";
import React, { useEffect, useState } from "react";
import AddSlot from "../Modal/AddSlot/AddSlot";
import EditSlot from "../Modal/EditSlot/EditSlot";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import styles from "./PublisherProfilepage.module.css";
import Spinner from "../../Spinner/Spinner";

type PublisherProfilePageProps = {
  pageName: any;
  pageUrl: any;
};
type item = {
  slotId: string;
  slotHeight: string;
  slotWidth: string;
};

const PublisherProfilePage = ({
  pageName,
  pageUrl,
}: PublisherProfilePageProps) => {
  const [show, setShow] = useState(false);
  const [editModal, setEditModal] = useState(false);
  const [dataUpdated, setDataUpdated] = useState(false);
  const [tableData, setTableData] = useState([]);

  const [editData, setEditData] = useState({
    slotId: "",
    slotHeight: "",
    slotWidth: "",
    id: "",
    pageName: "",
  });
  const slotData = (value: boolean) => {
    setDataUpdated(value);
  };

  const onDelete = async (slotId: string) => {
    console.log("dleete exclude");
    await fetch("/api/PublisherProfile/Slots/deleteSlot", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        data: {
          slotId: slotId,
          pageName: pageName,
          refId: sessionStorage.getItem("refId"),
        },
      }),
    })
      .then((res) => {
        res.json().then((data) => {
          setTableData(data.updatedData);
        });
        // mutate("/api/getPage");
      })
      .catch((e) => console.log(e));
  };
  const onUpdate = (
    slotId: string,
    slotHeight: string,
    slotWidth: string,
    id: string
  ) => {
    setEditModal(true);
    setEditData({
      slotId,
      slotHeight,
      slotWidth,
      id,
      pageName,
    });
  };

  useEffect(() => {
    fetch("/api/PublisherProfile/Slots/getSlot", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        data: {
          refId: sessionStorage.getItem("refId"),
          pageName: pageName,
        },
      }),
    })
      .then((data) => data.json())
      .then((data) => {
        setTableData(data.slotData);
      });
    setDataUpdated(false);

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dataUpdated]);
  return (
    <div className={styles.page}>
      <div className={styles.page_container}>
        <p>PublisherProfile/Page Details</p>
        <div>
          <p className={styles.page_title}>PAGE-{pageName}</p>
          <div className={styles.page_details}>
            <p>Page Name:{pageName}</p>
            <p>Page URL:{pageUrl}</p>
          </div>
        </div>
        <div>
          <p className={styles.table_heading}>Ad Slots</p>

          <table className={styles.table}>
            <thead>
              <tr>
                <th className={styles.table_head}>AD Slot ID</th>
                <th className={styles.table_head}>Width</th>
                <th className={styles.table_head}>Height</th>
                <th className={styles.table_head}>Actions</th>
              </tr>
            </thead>

            <tbody>
              {tableData.map((item: item, id) => (
                <>
                  <tr key={id}>
                    <td className={styles.table_data}>{item.slotId}</td>
                    <td className={styles.table_data}>{item.slotHeight}</td>
                    <td className={styles.table_data}>{item.slotWidth}</td>
                    <td className={styles.table_data}>
                      <button
                        onClick={() => onDelete(item.slotId)}
                        className={styles.icon}
                      >
                        <DeleteIcon />
                      </button>
                      <button
                        onClick={() =>
                          onUpdate(
                            item.slotId,
                            item.slotHeight,
                            item.slotWidth,
                            id.toString()
                          )
                        }
                        className={styles.icon}
                      >
                        <EditIcon />
                      </button>
                    </td>
                  </tr>
                </>
              ))}
            </tbody>
          </table>
          <button
            className={styles.button}
            onClick={() => {
              setShow(true);

              console.log("clicked");
            }}
          >
            Add Slots
          </button>
          <AddSlot
            show={show}
            onClose={() => setShow(false)}
            pageName={pageName}
            slotData={slotData}
          />
          <EditSlot
            editModal={editModal}
            onClose={() => setEditModal(false)}
            data={editData}
            slotData={slotData}
          />
        </div>
      </div>
    </div>
  );
};

export default PublisherProfilePage;
