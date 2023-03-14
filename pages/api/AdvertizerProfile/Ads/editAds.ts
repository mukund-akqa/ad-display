import type { NextApiRequest, NextApiResponse } from "next";
import { faunaClient } from "../../../../utils/fauna";
import { query as q } from "faunadb";
import { DeleteObjectCommand } from "@aws-sdk/client-s3";
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

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  const {
    refId,
    adId,
    assetWidth,
    assetHeight,
    id,
    campaignName,
    assetType,
    assetUrl,
    oldUrl,
  } = req.body.data;
  const bucketkey = oldUrl.split("amazonaws.com/")[1];
  const bucketParams = { Bucket: process.env.S3_BUCKET_NAME!, Key: bucketkey };
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
  let ad_details = {
    adId,
    assetType,
    assetUrl,
    assetHeight,
    assetWidth,
  };

  let campaignData = doc.data.advertizerProfile.campaigns;
  let obj = campaignData.find((x: any) => x.campaignName == campaignName);
  let objIndex = campaignData.findIndex(
    (index: any) => index.campaignName == campaignName
  );

  const ads = obj.ads;

  ads[id] = ad_details;

  obj.ads = ads;

  campaignData[objIndex] = obj;

  let query = await faunaClient.query(
    q.Update(q.Ref(q.Collection("demo_collection"), refId), {
      data: {
        advertizerProfile: {
          campaigns: campaignData,
        },
      },
    })
  );

  res.status(200).json({ updatedData: campaignData });
}
