import type { NextApiRequest, NextApiResponse } from "next";
import { faunaClient } from "../../../../lib/fauna";
import { query as q } from "faunadb";
type Data = {
  updatedData: any;
};

type doc = {
  data: any;
};
export default async function handler(req: NextApiRequest, res: NextApiResponse<Data>)  {
  const { refId, item } = req.body.data;

  let doc: doc = await faunaClient.query(
    q.Get(q.Ref(q.Collection("demo_collection"), refId))
  );
  //   console.log(item);

  let pageData = doc.data.advertizerProfile.matchingCriteria;
  const updatedData = pageData.excludePublishers.filter(
    (publisher: any) => publisher !== item
  );
  pageData.excludePublishers = updatedData;
  //   console.log("updated Data", updatedData);
  console.log(pageData);
  let query = await faunaClient.query(
    q.Update(q.Ref(q.Collection("demo_collection"), refId), {
      data: {
        advertizerProfile: {
          matchingCriteria: pageData,
        },
      },
    })
  );
  // console.log(doc)
  res.status(200).json({ updatedData: updatedData });
};