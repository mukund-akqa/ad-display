import type { NextApiRequest, NextApiResponse } from "next";
import { faunaClient } from "../../../../lib/fauna";
import { query as q } from "faunadb";
type Data = {
  updatedData: any;
};

type doc = {
  data: any;
};
export default async function handler(req: NextApiRequest, res: NextApiResponse<Data>) {
  const { refId, campaignName } = req.body.data;

  let doc: doc = await faunaClient.query(
    q.Get(q.Ref(q.Collection("demo_collection"), refId))
  );
  // console.log("pagename",pageName)
  let CampaignData = doc.data.advertizerProfile.campaigns;
  const updatedData = CampaignData.filter((item: any) => item.campaignName != campaignName);
  console.log("updated Data", updatedData);

  console.log(CampaignData);
  let query = await faunaClient.query(
    q.Update(q.Ref(q.Collection("demo_collection"), refId), {
      data: {
        advertizerProfile: {
          campaigns: updatedData,
        },
      },
    })
  );
  // console.log(doc)
  res.status(200).json({ updatedData: updatedData});
};
