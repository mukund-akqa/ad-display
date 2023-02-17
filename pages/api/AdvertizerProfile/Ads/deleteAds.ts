import type { NextApiRequest, NextApiResponse } from "next";
import { faunaClient } from "../../../../lib/fauna";
import { query as q } from "faunadb";
import S3 from "aws-sdk/clients/s3";
type Data = {
  updatedData: any;
};

type doc = {
  data: any;
};
const s3 = new S3({
  region: process.env.REGION,
  accessKeyId: process.env.ACCESS_KEY,
  secretAccessKey: process.env.SECRET_KEY,
  signatureVersion: "v4",
});
export default async function handler(req: NextApiRequest, res: NextApiResponse<Data>) {
  const { refId, adId, campaignName, assetUrl } = req.body.data;
  console.log("asseturl", assetUrl);
  const bucketkey = assetUrl.split("amazonaws.com/")[1];
  const bucketParams = { Bucket: "exchangeindia", Key: bucketkey };
  console.log(bucketkey);
  const deleteObject = await s3.deleteObject(bucketParams, (err, data) => {
    if (err) {
      console.log(err);
    } else {
      console.log("successfully deleted");
      console.log(data);
    }
  });

  let doc: doc = await faunaClient.query(
    q.Get(q.Ref(q.Collection("demo_collection"), refId))
  );
  console.log(campaignName);

  let campaignData = doc.data.advertizerProfile.campaigns;
  let obj = campaignData.find((x: any) => x.campaignName == campaignName);
  //   console.log("obj",obj)
  let index = campaignData.indexOf(obj);
  //   console.log("Indexx",index)

  const updatedData = obj.ads.filter((item: any) => item.adId != adId);
    // console.log("updated Data", updatedData);

  console.log(campaignData);
  //   console.log(obj.adSlots)
  //   console.log("obj",obj)
  //   console.log(updatedData)
  obj.ads = updatedData;
  //   console.log(obj)

  campaignData.slice(index, 1, obj);
  //     console.log(pageData[0])
  //   console.log("pageData",pageData)
  //   const newData=pageData.filter((item:any)=>item.pageName!=obj.pageName)

  //   newData.push(obj)
  //   console.log("newData",newData)
  let query = await faunaClient.query(
    q.Update(q.Ref(q.Collection("demo_collection"), refId), {
      data: {
        advertizerProfile: {
          campaigns: campaignData,
        },
      },
    })
  );
  // console.log(doc)
  res.status(200).json({ updatedData: updatedData });
};
