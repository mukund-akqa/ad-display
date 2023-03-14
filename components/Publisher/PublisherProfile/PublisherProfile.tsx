import Link from "next/link";
import React, { useEffect, useState } from "react";
import AddAdvertizer from "../Modal/AddAdvertizer/AddAdvertizer";
import AddPage from "../Modal/AddPage/AddPage";
import EditPage from "../Modal/EditPage/EditPage";
import ExcludeAdvertizer from "../Modal/ExcludeAdvertizer/ExcludeAdvertizer";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import styles from "./PublisherProfile.module.css";

type item = {
  pageName: string;
  pageUrl: string;
  id: string;
};

const PublisherProfile = () => {
  const [show, setShow] = useState(false);
  const [editshow, setEditShow] = useState(false);
  const [showAdvertizer, setShowAdvertizer] = useState(false);
  const [showExcludedAdvertizer, setShowExcludedAdvertizer] = useState(false);
  const [tableData, setTableData] = useState([]);
  const [includeAdvertizers, setIncludeAdvertizers] = useState([]);
  const [excludeAdvertizers, setExcludeAdvertizers] = useState([]);
  const [dataUpdated, setDataUpdated] = useState(false);
  const [IncludedataUpdated, setIncludeDataUpdated] = useState(false);
  const [ExcludedataUpdated, setExcludeDataUpdated] = useState(false);
  const [editData, setEditData] = useState({
    pageName: "",
    pageUrl: "",
    id: "",
  });

  const pageData = (value: boolean) => {
    setDataUpdated(value);
  };
  const Includedata = (value: boolean) => {
    setIncludeDataUpdated(value);
  };
  const Excludedata = (value: boolean) => {
    setExcludeDataUpdated(value);
  };

  const handleAction = async (pageName: string) => {
    await fetch("/api/PublisherProfile/Webpages/deletePage", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        data: {
          pageName: pageName,
          refId: sessionStorage.getItem("refId"),
        },
      }),
    })
      .then((res) => {
        res.json().then((data) => {
          setTableData(data.updatedData);
        });
      })
      .catch((e) => console.log(e));
  };

  const onDelete = async (item: string) => {
    await fetch("/api/PublisherProfile/IncludeAdvertizer/deleteInAdvertizer", {
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
          setIncludeAdvertizers(data.updatedData);
        });
      })
      .catch((e) => console.log(e));
  };

  const excludeDelete = async (item: string) => {
    console.log("dleete exclude");
    await fetch("/api/PublisherProfile/ExcludeAdvertizer/deleteExAdvertizer", {
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
          setExcludeAdvertizers(data.updatedData);
        });
      })
      .catch((e) => console.log(e));
  };

  const handleChange = (pageName: string, pageUrl: string, id: string) => {
    setEditShow(true);
    setEditData({
      pageName,
      pageUrl,
      id,
    });
  };

  useEffect(() => {
    fetch("/api/PublisherProfile/Webpages/getPage", {
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
      .then((data) => setTableData(data.pageData));
    setDataUpdated(false);
  }, [dataUpdated]);

  useEffect(() => {
    fetch("/api/PublisherProfile/IncludeAdvertizer/getIncludeAdvertizer", {
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
      .then((data) => setIncludeAdvertizers(data.pageData));
    setIncludeDataUpdated(false);
  }, [IncludedataUpdated]);

  useEffect(() => {
    fetch("/api/PublisherProfile/ExcludeAdvertizer/getExcludeAdvertizer", {
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
      .then((data) => setExcludeAdvertizers(data.pageData));
    setExcludeDataUpdated(false);
  }, [ExcludedataUpdated]);

  return (
    <div className={styles.profile}>
      <div className={styles.profile_container}>
        <h1>Publisher Profile</h1>
        <div>
          <p className={styles.table_heading}>PAGES</p>
          <table className={styles.table}>
            <thead>
              <tr>
                <th className={styles.table_head}>Page Name</th>
                <th className={styles.table_head_URL}>Page URL</th>
                <th className={styles.table_head}>Actions</th>
              </tr>
            </thead>
            <tbody>
              {tableData.map((item: item, id) => {
                const linkUrl = item.pageName
                  .replace(/\s+/g, "-")
                  .toLowerCase();

                return (
                  <>
                    <tr key={id} id={id.toString()}>
                      <td className={styles.table_data_pageName}>
                        <Link
                          href={{
                            pathname: `/account/publisher/${linkUrl}`,
                            query: {
                              pageName: item.pageName,
                              pageUrl: item.pageUrl,
                            },
                          }}
                        >
                          {item.pageName}
                        </Link>
                      </td>
                      <td className={styles.table_data_URL}>{item.pageUrl}</td>
                      <td className={styles.table_data}>
                        <button
                          onClick={() => handleAction(item.pageName)}
                          className={styles.icon}
                        >
                          <DeleteIcon />
                        </button>
                        <button
                          onClick={() => {
                            document.body.style.overflow = "hidden";
                            handleChange(
                              item.pageName,
                              item.pageUrl,
                              id.toString()
                            );
                          }}
                          className={styles.icon}
                        >
                          <EditIcon />
                        </button>
                      </td>
                    </tr>
                    <EditPage
                      editshow={editshow}
                      onClose={() => {
                        setEditShow(false);
                        document.body.style.overflow = "scroll";
                      }}
                      data={editData}
                      pageData={pageData}
                    />
                  </>
                );
              })}
            </tbody>
          </table>
          <button
            className={styles.button}
            onClick={() => {
              setShow(true);

              document.body.style.overflow = "hidden";
            }}
          >
            Add Page
          </button>
          <AddPage
            show={show}
            onClose={() => {
              setShow(false);
              document.body.style.overflow = "scroll";
            }}
            pageData={pageData}
          />
        </div>
        <div>
          <p className={styles.table_heading}>Matching Criteria</p>
          <div>
            <p>Include Advertizers</p>
            <table className={styles.table}>
              <thead>
                <tr>
                  <th className={styles.table_head}>Advertizer</th>
                  <th className={styles.table_head}>Actions</th>
                </tr>
              </thead>
              <tbody>
                {includeAdvertizers.map((item, id) => (
                  <>
                    <tr id={id.toString()} key={id}>
                      <td className={styles.table_data}>{item}</td>
                      <td className={styles.table_data}>
                        <button
                          onClick={() => onDelete(item)}
                          className={styles.icon}
                        >
                          <DeleteIcon />
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
                setShowAdvertizer(true);
                document.body.style.overflow = "hidden";
              }}
            >
              Add Advertizer
            </button>
            <AddAdvertizer
              showAdvertizer={showAdvertizer}
              onClose={() => {
                setShowAdvertizer(false);
                document.body.style.overflow = "scroll";
              }}
              Includedata={Includedata}
            />
          </div>
          <div>
            <p>Exclude Advertizers</p>
            <table className={styles.table}>
              <thead>
                <tr>
                  <th className={styles.table_head}>Advertizer</th>
                  <th className={styles.table_head}>Actions</th>
                </tr>
              </thead>
              <tbody>
                {excludeAdvertizers.map((item, id) => (
                  <>
                    <tr id={id.toString()} key={id}>
                      <td className={styles.table_data}>{item}</td>
                      <td className={styles.table_data}>
                        <button
                          onClick={() => excludeDelete(item)}
                          className={styles.icon}
                        >
                          <DeleteIcon />
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
                setShowExcludedAdvertizer(true);
                document.body.style.overflow = "hidden";
              }}
            >
              Add Advertizer
            </button>
            <ExcludeAdvertizer
              showExcludedAdvertizer={showExcludedAdvertizer}
              onClose={() => {
                setShowExcludedAdvertizer(false);
                document.body.style.overflow = "scroll";
              }}
              Excludedata={Excludedata}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default PublisherProfile;
