import type { NextApiRequest, NextApiResponse } from "next";
import { faunaClient } from "../../../../lib/fauna";
import { query as q } from "faunadb";

type Data = {
  CampaignData: [];
};

type doc = {
  data: any;
};
export default async (req: NextApiRequest, res: NextApiResponse<Data>) => {
  const { refId } = req.body.data;

  let doc: doc = await faunaClient.query(
    q.Get(q.Ref(q.Collection("demo_collection"), refId))
  );

  let CampaignData = doc.data.advertizerProfile.campaigns;
//   console.log(CampaignData);

  res.status(200).json({ CampaignData: CampaignData });
};
