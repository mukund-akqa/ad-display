import React, { useEffect, useState } from "react";
import styles from "./MatchingCriteria.module.css";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import AddPublisher from "../AdvertizerModal/AddPublisher/AddPublisher";
import ExcludePublisher from "../AdvertizerModal/ExcludePublisher/ExcludePublisher";

type MatchingCriteriaProps = {
  heading: any;
};

const MatchingCriteria = (props: MatchingCriteriaProps) => {
  const [showIncludedPublisher, setShowIncludedPublisher] = useState(false);
  const [showExcludedPublisher,setShowExcludedPublisher] = useState(false)
  const [includePublishers, setIncludePublishers] = useState([]);
  const [excludePublishers, setExcludePublishers] = useState([]);

  const deleteIncludePublisher = async(item:string) =>{
    console.log("dleete");
    await fetch("/api/AdvertizerProfile/IncludePublisher/deletePublisher", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        data: {
          item: item,
          refId: sessionStorage.getItem("refId"),
        },
      }),
    })
      .then((res) => {
        res.json().then((data) => {
          setIncludePublishers(data.updatedData);
        });
        // mutate("/api/getPage");
      })
      .catch((e) => console.log(e));
  }
  const deleteExcludePublisher = async(item:string) =>{
    console.log("dleete");
    await fetch("/api/AdvertizerProfile/ExcludePublisher/deletePublisher", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        data: {
          item: item,
          refId: sessionStorage.getItem("refId"),
        },
      }),
    })
      .then((res) => {
        res.json().then((data) => {
          setExcludePublishers(data.updatedData);
        });
        // mutate("/api/getPage");
      })
      .catch((e) => console.log(e));
  }

  useEffect(() => {
    fetch("/api/AdvertizerProfile/IncludePublisher/getPublisher", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        data: {
          refId: sessionStorage.getItem("refId"),
        },
      }),
    })
      .then((data) => data.json())
      .then((data) => setIncludePublishers(data.pageData));
  }, [includePublishers]);
  useEffect(() => {
    fetch("/api/AdvertizerProfile/ExcludePublisher/getPublisher", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        data: {
          refId: sessionStorage.getItem("refId"),
        },
      }),
    })
      .then((data) => data.json())
      .then((data) => setExcludePublishers(data.pageData));
  }, [excludePublishers]);
  return (
    <div>
      <p>{props.heading}</p>
      <table className={styles.table}>
        <thead>
          <tr>
            <th className={styles.table_head}>Publisher</th>
            <th className={styles.table_head}>Actions</th>
          </tr>
        </thead>
        <tbody>
          {props.heading === "Include Publisher" ? (
            <>
              {includePublishers.map((item) => (
                <tr>
                  <td className={styles.table_data}>{item}</td>
                  <td className={styles.table_data}>
                    <button className={styles.icon} onClick={()=>deleteIncludePublisher(item)}>
                      <DeleteIcon />
                    </button>
                  </td>
                </tr>
              ))}
            </>
          ) : (
            <>
            {excludePublishers.map((item) => (
              <tr>
                <td className={styles.table_data}>{item}</td>
                <td className={styles.table_data}>
                  <button className={styles.icon} onClick={()=>deleteExcludePublisher(item)}>
                    <DeleteIcon />
                  </button>
                </td>
              </tr>
            ))}
          </>
          )}
        </tbody>
      </table>
      {props.heading === "Include Publisher" ? (
        <button
          className={styles.button}
          onClick={() => {
            setShowIncludedPublisher(true);
          }}
        >
          Add Publisher
        </button>
      ) : (
        <button className={styles.button} onClick={() => {
            setShowExcludedPublisher(true)
        }}>Add Publisher</button>
      )}

      <AddPublisher
        showIncludedPublisher={showIncludedPublisher}
        onClose={() => setShowIncludedPublisher(false)}
      />
      <ExcludePublisher
        showExcludedPublisher={showExcludedPublisher}
        onClose={() => setShowExcludedPublisher(false)}
      />
    </div>
  );
};

export default MatchingCriteria;
