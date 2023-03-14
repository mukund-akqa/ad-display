import type { NextApiRequest, NextApiResponse } from "next";
import { faunaClient } from "../../../../utils/fauna";
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

  let ans = oldData.excludePublishers.includes(publisher);
  let check = oldData.includePublishers.includes(publisher);
  if (ans || check) {
    res.status(400).json({
      error: "Publisher already exists either in include or exclude publishers",
    });
  } else {
    oldData.excludePublishers.push(publisher);
    let query = await faunaClient.query(
      q.Update(q.Ref(q.Collection("demo_collection"), refId), {
        data: {
          advertizerProfile: {
            matchingCriteria: oldData,
          },
        },
      })
    );
    res.status(200).json({ name: "data" });
  }
}
