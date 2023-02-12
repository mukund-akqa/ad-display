import type { NextApiRequest, NextApiResponse } from "next";
import { faunaClient } from "../../../../lib/fauna";
import { query as q } from "faunadb";

type Data = {
  adsData: any;
};

type doc = {
  data: any;
};
export default async function handler(req: NextApiRequest, res: NextApiResponse<Data>)  {
  const { refId, campaignName } = req.body.data;
  // console.log(campaignName);

  let doc: doc = await faunaClient.query(
    q.Get(q.Ref(q.Collection("demo_collection"), refId))
  );
  // console.log("doc",doc)

  let adsData = doc.data.advertizerProfile.campaigns;
  console.log("adsData",adsData)
  let obj = adsData.find((x: any) => x.campaignName == campaignName);
  // console.log("obj",obj)

  
//   console.log(obj.ads);

  res.status(200).json({ adsData: obj.ads });
};
