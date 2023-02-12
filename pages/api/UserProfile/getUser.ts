import type { NextApiRequest, NextApiResponse } from "next";
import { faunaClient } from "../../../lib/fauna";
import { query as q } from "faunadb";

type Data = {
  error?: any;
  userData?: any;
};
type doc = {
  data: any;
};

export default async function handler(req: NextApiRequest, res: NextApiResponse<Data>)  {
  try {
    const { refId } = req.body.data;
    // let doc :doc = await faunaClient.query(
    //   q.Get(q.Match(q.Index("email_index"), "ram@gmail.com"))
    // );
    let doc: doc = await faunaClient.query(
      q.Get(q.Ref(q.Collection("demo_collection"), refId))
    );
    let oldData = doc.data.user;
    console.log("oldata", oldData);
    res.status(200).json({ userData: oldData });
  } catch (e: any) {
    res.status(500).json({ error: e.message });
  }
};
