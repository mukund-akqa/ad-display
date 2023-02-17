import { style } from "@mui/system";
import Link from "next/link";
import React, { useEffect, useRef, useState } from "react";
import AddCampaign from "../AdvertizerModal/AddCampaign/AddCampaign";
import MatchingCriteria from "../MatchingCriteria/MatchingCriteria";
import styles from "./AdvertizerProfile.module.css";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import EditCampaign from "../AdvertizerModal/EditCampaign/EditCampaign";

type item = {
  campaignName: any;
  landingPageUrl: any;
};

const AdvertizerProfile = () => {
  const [showCampaign, setShowCampaign] = useState(false);
  const [campaignData, setCampaignData] = useState([]);
  const [dataUpdated, setDataUpdated] = useState(false);
  const [editModalCampaign, setEditModalCampaign] = useState(false);
  const [editData, setEditData] = useState({
    campaignName: "",
    landingPageUrl: "",
    id: "",
  });
  const campdata = (value: boolean) => {
    setDataUpdated(value);
  };
  const deleteCampaign = async (campaignName: string) => {
    console.log(campaignName);
    await fetch("/api/AdvertizerProfile/Campaign/deleteCampaign", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        data: {
          campaignName: campaignName,
          refId: sessionStorage.getItem("refId"),
        },
      }),
    })
      .then((res) => {
        res.json().then((data) => {
          setCampaignData(data.updatedData);
        });
        // mutate("/api/getPage");
      })
      .catch((e) => console.log(e));
  };

  const editCampaign = (
    campaignName: string,
    landingPageUrl: string,
    id: string
  ) => {
    setEditModalCampaign(true);
    setEditData({
      campaignName: campaignName,
      landingPageUrl: landingPageUrl,
      id: id,
    });
  };
  useEffect(() => {
    fetch("/api/AdvertizerProfile/Campaign/getCampaign", {
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
      .then((data) => {
        // console.log("data:", data.CampaignData);
        setCampaignData(data.CampaignData);
        setDataUpdated(false);
      });
  }, [dataUpdated]);

  return (
    <div className={styles.profile}>
      <div className={styles.profile_container}>
        <h1>Advertizer Profile</h1>
        <div>
          <p className={styles.table_heading}>CAMPAIGNS</p>
          <table className={styles.table}>
            <thead>
              <tr>
                <th className={styles.table_head}>Name</th>
                <th className={styles.table_head_URL}>Page URL</th>
                <th className={styles.table_head}>Actions</th>
              </tr>
            </thead>
            <tbody>
              {campaignData.map((item: item, id) => {
                const linkUrl = item.campaignName
                  .replace(/\s+/g, "-")
                  .toLowerCase();
                return (
                  <>
                    <tr>
                      <td
                        className={`${styles.table_data} ${styles.campaignName}`}
                      >
                        <Link
                          href={{
                            pathname: `/account/advertizer/${linkUrl}`,
                            query: {
                              campaignName: item.campaignName,
                              landingPageUrl: item.landingPageUrl,
                            },
                          }}
                        >
                          {item.campaignName}
                        </Link>
                      </td>
                      <td className={styles.table_data}>
                        {item.landingPageUrl}
                      </td>
                      <td className={styles.table_data}>
                        <button
                          onClick={() => deleteCampaign(item.campaignName)}
                          className={styles.icon}
                        >
                          <DeleteIcon />
                        </button>
                        <button
                          onClick={() =>
                            editCampaign(
                              item.campaignName,
                              item.landingPageUrl,
                              id.toString()
                            )
                          }
                          className={styles.icon}
                        >
                          {" "}
                          <EditIcon />
                        </button>
                        <EditCampaign
                          editModalCampaign={editModalCampaign}
                          onClose={() => setEditModalCampaign(false)}
                          data={editData}
                          campdata={campdata}
                        />
                      </td>
                    </tr>
                  </>
                );
              })}
            </tbody>
          </table>
          <button
            className={styles.button}
            onClick={() => setShowCampaign(true)}
          >
            Add Campaign
          </button>
          <AddCampaign
            showCampaign={showCampaign}
            onClose={() => setShowCampaign(false)}
            campdata={campdata}
          />
        </div>
        <div>
          <p className={styles.table_heading}>Matching Criteria</p>
          <MatchingCriteria heading="Include Publisher" />
          <MatchingCriteria heading="Exclude Publisher" />
        </div>
      </div>
    </div>
  );
};

export default AdvertizerProfile;
