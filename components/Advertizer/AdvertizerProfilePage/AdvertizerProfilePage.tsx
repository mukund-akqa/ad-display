import React, { useEffect, useState } from "react";
import AddAdvertisement from "../AdvertizerModal/AddAdvertisement/AddAdvertisement";
import styles from "./AdvertizerProfilePage.module.css";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import EditAdvertisment from "../AdvertizerModal/EditAdvertisement/EditAdvertisement";
import EditAdvertisement from "../AdvertizerModal/EditAdvertisement/EditAdvertisement";

type AdvertizerProfilePageProps = {
  campaignName: any;
  landingPageUrl: any;
};

type item = {
  adId: string;
  assetType: string;
  assetUrl: string;
  assetHeight: string;
  assetWidth: string;
};

const AdvertizerProfilePage = ({
  campaignName,
  landingPageUrl,
}: AdvertizerProfilePageProps) => {
  const [addModal, setAddModal] = useState(false);
  const [editModal, setEditModal] = useState(false);
  const [adData, setAdData] = useState([]);
  const [editData, setEditData] = useState({
    adId: "",
    assetType: "",
    assetUrl: "",
    assetHeight: "",
    assetWidth:"",
    campaignName:"",
    id:"",
    
  });

  const deleteAd = async(adId:string,assetUrl:string) =>{
    console.log("dleete exclude");
    await fetch("/api/AdvertizerProfile/Ads/deleteAds", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        data: {
          adId: adId,
          campaignName: campaignName,
          assetUrl:assetUrl,
          refId: sessionStorage.getItem("refId"),
        },
      }),
    })
      .then((res) => {
        // res.json().then((data) => {
        //   setTableData(data.updatedData);
        // });
        // mutate("/api/getPage");
      })
      .catch((e) => console.log(e));
  }

  const editAd = (adId:string,assetType:string,assetUrl:string,assetHeight:string,assetWidth:string,id:string) => {
    setEditModal(true)
    setEditData({
        adId,
        assetType,
        assetUrl,
        assetHeight,
        assetWidth,
        campaignName,
        id
    })
  }
  useEffect(() => {
    fetch("/api/AdvertizerProfile/Ads/getAds", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        data: {
          refId: sessionStorage.getItem("refId"),
          campaignName: campaignName,
        },
      }),
    })
      .then((data) => data.json())
      .then((data) => setAdData(data.adsData));
  });
  return (
    <div className={styles.page}>
      <div className={styles.page_container}>
        <p>AdvertizerProfile/Page Details</p>
        <div>
          <p className={styles.page_title}>CAMPAIGN-{campaignName}</p>
          <div className={styles.page_details}>
            <p>Campaign Name:{campaignName}</p>
            <p>landing Page URL: {landingPageUrl}</p>
          </div>
        </div>
        <div>
          <p className={styles.table_heading}>Ads</p>
          <table className={styles.table}>
            <thead>
              <tr>
                <th className={styles.table_head}>AD ID</th>
                <th className={styles.table_head}>Asset Type</th>
                <th className={styles.table_head}>Asset Url</th>
                <th className={styles.table_head}>Asset Height</th>
                <th className={styles.table_head}>Asset Width</th>
                <th className={styles.table_head}>Actions</th>
              </tr>
            </thead>
            <tbody>
              {adData.map((item: item, id) => (
                <>
                  <tr>
                    <td className={styles.table_data}>{item.adId}</td>
                    <td className={styles.table_data}>{item.assetType}</td>
                    <td className={styles.table_data_url}>{item.assetUrl}</td>
                    <td className={styles.table_data}>{item.assetHeight}</td>
                    <td className={styles.table_data}>{item.assetWidth}</td>
                    <td className={styles.table_data}>
                      <button onClick={() => deleteAd(item.adId,item.assetUrl)} className={styles.icon}>
                        <DeleteIcon />
                      </button>
                      <button className={styles.icon} onClick={() => editAd(item.adId,item.assetType,item.assetUrl,item.assetHeight,item.assetWidth,id.toString())}>
                        <EditIcon />
                      </button>
                    </td>
                  </tr>
                </>
              ))}
            </tbody>
          </table>
          <button className={styles.button} onClick={() => setAddModal(true)}>
            Add Advertisement
          </button>
          <AddAdvertisement
            addModal={addModal}
            onClose={() => setAddModal(false)}
            campaignName={campaignName}
          />
          <EditAdvertisement
            editModal={editModal}
            onClose={() => setEditModal(false)}
            data={editData}
          />
          
        </div>
      </div>
    </div>
  );
};

export default AdvertizerProfilePage;
