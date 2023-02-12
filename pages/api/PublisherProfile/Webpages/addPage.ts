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
export default async function handler(req: NextApiRequest, res: NextApiResponse<Data>)  {
  const { refId, pageName, pageUrl } = req.body.data;
  let doc: doc = await faunaClient.query(
    q.Get(q.Ref(q.Collection("demo_collection"), refId))
  );

  let pageDetails = {
    pageName: pageName,
    pageUrl: pageUrl,
    adSlots: [],
  };
  let oldData = doc.data.publisherProfile.pages;
  let obj = oldData.find((x: any) => x.pageName == pageName);
  if (obj) {
    res.status(400).json({ error: "page already exists" });
  } else {
    oldData.push(pageDetails);
    let query = await faunaClient.query(
      q.Update(q.Ref(q.Collection("demo_collection"), refId), {
        data: {
          publisherProfile: {
            pages: oldData,
          },
        },
      })
    );
    res.status(200).json({ name: "John Doe" });
  }
};
