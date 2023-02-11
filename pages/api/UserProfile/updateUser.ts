import type { NextApiRequest, NextApiResponse } from "next";
import { faunaClient } from "../../../lib/fauna";
import { query as q } from "faunadb";

type Data = {
  name: string;
  phone: string;
  email: string;
  siteName: string;
};
type doc = {
  data: any;
};

export default async (req: NextApiRequest, res: NextApiResponse<Data>) => {
  const { name, email, phone, siteName, refId } = req.body.data;

  let query = await faunaClient.query(
    q.Update(q.Ref(q.Collection("demo_collection"), refId), {
      data: {
        user: {
          name: name,
          email: email,
          phone: phone,
          siteName: siteName,
        },
      },
    })
  );
  res
    .status(200)
    .json({ name: name, email: email, phone: phone, siteName: siteName });
};
