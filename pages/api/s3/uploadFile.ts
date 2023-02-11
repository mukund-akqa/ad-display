import type { NextApiRequest, NextApiResponse } from "next";
import { v4 as uuid } from "uuid";
import S3 from "aws-sdk/clients/s3";

const s3 = new S3({
  region: process.env.REGION,
  accessKeyId: process.env.ACCESS_KEY,
  secretAccessKey: process.env.SECRET_KEY,
  signatureVersion: "v4",
});

export default async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    let { name, type } = req.body;
    const unique_id = uuid();
    console.log(name);
    console.log(type);
    const fileParams = {
      Bucket: process.env.S3_BUCKET_NAME,
      Key: `${unique_id}-${name}`,
      Expires: 600,
      // ContentType: type,
      // ACL: "public-read",
    };
    const url = await s3.getSignedUrlPromise("putObject", fileParams);

    res.status(200).json({ url });
  } catch (err) {
    console.log(err);
    res.status(400).json({ message: err });
  }
};
