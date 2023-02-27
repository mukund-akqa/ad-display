import type { NextApiRequest, NextApiResponse } from "next";
import { faunaClient } from "../../../../lib/fauna";
import { query as q } from "faunadb";

type Data = {
  name?: string;
  error?: string;
};

type doc = {
  data: any;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  const { refId, publisher } = req.body.data;
  let doc: doc = await faunaClient.query(
    q.Get(q.Ref(q.Collection("demo_collection"), refId))
  );
  console.log(publisher);
  let oldData = doc.data.advertizerProfile.matchingCriteria;
  //   console.log(oldData);
  let ans = oldData.includePublishers.includes(publisher);
  if (ans) {
    res.status(400).json({ error: "publisher already exists" });
  } else {
    oldData.includePublishers.push(publisher);
    let query = await faunaClient.query(
      q.Update(q.Ref(q.Collection("demo_collection"), refId), {
        data: {
          advertizerProfile: {
            matchingCriteria: oldData,
          },
        },
      })
    );
    res.status(200).json({ name: "John Doe" });
  }
}
