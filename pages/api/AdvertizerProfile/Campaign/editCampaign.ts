import type { NextApiRequest, NextApiResponse } from "next";
import { faunaClient } from "../../../../utils/fauna";
import { query as q } from "faunadb";

type Data = {
  name: string;
};

type doc = {
  data: any;
};
export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  const { refId, campaignName, landingPageUrl, id } = req.body.data;
  let doc: doc = await faunaClient.query(
    q.Get(q.Ref(q.Collection("demo_collection"), refId))
  );

  let campaignData = doc.data.advertizerProfile.campaigns;
  let obj = campaignData[id];

  obj.campaignName = campaignName;
  obj.landingPageUrl = landingPageUrl;

  campaignData.slice(id, 1, obj);

  let query = await faunaClient.query(
    q.Update(q.Ref(q.Collection("demo_collection"), refId), {
      data: {
        advertizerProfile: {
          campaigns: campaignData,
        },
      },
    })
  );
  res.status(200).json({ name: "John Doe" });
}
