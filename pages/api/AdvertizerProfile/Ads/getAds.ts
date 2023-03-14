import type { NextApiRequest, NextApiResponse } from "next";
import { faunaClient } from "../../../../utils/fauna";
import { query as q } from "faunadb";

type Data = {
  adsData: any;
};

type doc = {
  data: any;
};
export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  const { refId, campaignName } = req.body.data;

  let doc: doc = await faunaClient.query(
    q.Get(q.Ref(q.Collection("demo_collection"), refId))
  );

  let adsData = doc.data.advertizerProfile.campaigns;

  let obj = adsData.find((x: any) => x.campaignName == campaignName);

  res.status(200).json({ adsData: obj.ads });
}
