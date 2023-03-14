import type { NextApiRequest, NextApiResponse } from "next";
import { faunaClient } from "../../../../utils/fauna";
import { query as q } from "faunadb";
type Data = {
  updatedData: any;
};

type doc = {
  data: any;
};
export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  const { refId, item } = req.body.data;

  let doc: doc = await faunaClient.query(
    q.Get(q.Ref(q.Collection("demo_collection"), refId))
  );

  let pageData = doc.data.advertizerProfile.matchingCriteria;
  const updatedData = pageData.excludePublishers.filter(
    (publisher: any) => publisher !== item
  );
  pageData.excludePublishers = updatedData;

  let query = await faunaClient.query(
    q.Update(q.Ref(q.Collection("demo_collection"), refId), {
      data: {
        advertizerProfile: {
          matchingCriteria: pageData,
        },
      },
    })
  );

  res.status(200).json({ updatedData: updatedData });
}
