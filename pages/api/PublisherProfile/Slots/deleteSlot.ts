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
  const { refId, slotId, pageName } = req.body.data;

  let doc: doc = await faunaClient.query(
    q.Get(q.Ref(q.Collection("demo_collection"), refId))
  );

  let pageData = doc.data.publisherProfile.pages;
  let obj = pageData.find((x: any) => x.pageName == pageName);
  let index = pageData.indexOf(obj);

  const updatedData = obj.adSlots.filter((item: any) => item.slotId != slotId);

  obj.adSlots = updatedData;

  pageData.slice(index, 1, obj);

  let query = await faunaClient.query(
    q.Update(q.Ref(q.Collection("demo_collection"), refId), {
      data: {
        publisherProfile: {
          pages: pageData,
        },
      },
    })
  );

  res.status(200).json({ updatedData: updatedData });
}
