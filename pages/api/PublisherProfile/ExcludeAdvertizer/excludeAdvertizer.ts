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
  const { refId, advertizer } = req.body.data;
  let doc: doc = await faunaClient.query(
    q.Get(q.Ref(q.Collection("demo_collection"), refId))
  );
  console.log(advertizer);
  let oldData = doc.data.publisherProfile.matchingCriteria;
  //   console.log(oldData);
  let ans = oldData.excludeAdvertizers.includes(advertizer);
  if (ans) {
    res.status(400).json({ error: "Advertizer already exists" });
  } else {
    oldData.excludeAdvertizers.push(advertizer);
    let query = await faunaClient.query(
      q.Update(q.Ref(q.Collection("demo_collection"), refId), {
        data: {
          publisherProfile: {
            matchingCriteria: oldData,
          },
        },
      })
    );
    res.status(200).json({ name: "John Doe" });
  }
}
