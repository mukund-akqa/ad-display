import type { NextApiRequest, NextApiResponse } from "next";
import { faunaClient } from "../../../../utils/fauna";
import { query as q } from "faunadb";

type Data = {
  campaign?: any;
  error?: string;
};

type doc = {
  data: any;
};
export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  const { refId, campaignName, landingPageUrl } = req.body.data;
  let doc: doc = await faunaClient.query(
    q.Get(q.Ref(q.Collection("demo_collection"), refId))
  );
  let campaignDetails = {
    campaignName: campaignName,
    landingPageUrl: landingPageUrl,
    ads: [],
  };

  let oldData = doc.data.advertizerProfile.campaigns;
  let obj = oldData.find((x: any) => x.campaignName == campaignName);
  if (obj) {
    res.status(400).json({ error: "campaign already exists" });
  } else {
    oldData.push(campaignDetails);
    let query = await faunaClient.query(
      q.Update(q.Ref(q.Collection("demo_collection"), refId), {
        data: {
          advertizerProfile: {
            campaigns: oldData,
          },
        },
      })
    );
    res.status(200).json({ campaign: oldData });
  }
}
