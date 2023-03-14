import type { NextApiRequest, NextApiResponse } from "next";
import { faunaClient } from "../../../../utils/fauna";
import { query as q } from "faunadb";

type Data = {
  CampaignData?: any;
  error?: string;
};

type doc = {
  data: any;
};
export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  const {
    refId,
    campaignName,
    adId,
    assetType,
    assetUrl,
    assetHeight,
    assetWidth,
  } = req.body.data;
  let doc: doc = await faunaClient.query(
    q.Get(q.Ref(q.Collection("demo_collection"), refId))
  );
  let ad_details = {
    adId,
    assetType,
    assetUrl,
    assetHeight,
    assetWidth,
  };

  let CampaignData = doc.data.advertizerProfile.campaigns;

  let obj = CampaignData.find((x: any) => x.campaignName == campaignName);

  let ad = obj.ads.find((ad: any) => ad.adId == adId);

  let objIndex = CampaignData.findIndex(
    (index: any) => index.campaignName == campaignName
  );
  if (ad) {
    res.status(400).json({ error: "adId already exists" });
  } else {
    obj.ads.push(ad_details);
    let query = await faunaClient.query(
      q.Update(q.Ref(q.Collection("demo_collection"), refId), {
        data: {
          advertizerProfile: {
            campaigns: CampaignData,
          },
        },
      })
    );

    res.status(200).json({ CampaignData: CampaignData });
  }
}
