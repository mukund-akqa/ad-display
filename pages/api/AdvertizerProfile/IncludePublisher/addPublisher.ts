import type { NextApiRequest, NextApiResponse } from "next";
import { faunaClient } from "../../../../lib/fauna";
import { query as q } from "faunadb";

type Data = {
  name: string;
};

type doc = {
  data: any;
};

export default async (req: NextApiRequest, res: NextApiResponse<Data>) => {
  const { refId, publisher } = req.body.data;
  let doc: doc = await faunaClient.query(
    q.Get(q.Ref(q.Collection("demo_collection"), refId))
  );
  console.log(publisher);
  let oldData = doc.data.advertizerProfile.matchingCriteria;
  //   console.log(oldData);
  oldData.includePublishers.push(publisher);
  //   console.log("oldData", oldData);

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
};