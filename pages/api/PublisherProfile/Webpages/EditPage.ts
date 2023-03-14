import type { NextApiRequest, NextApiResponse } from "next";
import { faunaClient } from "../../../../utils/fauna";
import { query as q } from "faunadb";

type Data = {
  name: string;
};

type doc = {
  data: any;
};
export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  const { refId, pageName, pageUrl, id } = req.body.data;
  let doc: doc = await faunaClient.query(
    q.Get(q.Ref(q.Collection("demo_collection"), refId))
  );

  let pageData = doc.data.publisherProfile.pages;
  let obj = pageData[id];

  obj.pageName = pageName;
  obj.pageUrl = pageUrl;

  pageData.slice(id, 1, obj);

  let query = await faunaClient.query(
    q.Update(q.Ref(q.Collection("demo_collection"), refId), {
      data: {
        publisherProfile: {
          pages: pageData,
        },
      },
    })
  );
  res.status(200).json({ name: "John Doe" });
}
