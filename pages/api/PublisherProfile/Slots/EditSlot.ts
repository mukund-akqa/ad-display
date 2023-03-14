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
  const { refId, slotId, slotWidth, slotHeight, id, pageName } = req.body.data;
  let doc: doc = await faunaClient.query(
    q.Get(q.Ref(q.Collection("demo_collection"), refId))
  );

  let slotDetails = {
    slotId: slotId,
    slotHeight: slotHeight,
    slotWidth: slotWidth,
  };
  let pageData = doc.data.publisherProfile.pages;

  let obj = pageData.find((x: any) => x.pageName == pageName);
  let objIndex = pageData.findIndex((index: any) => index.pageName == pageName);

  const adSlots = obj.adSlots;

  adSlots[id] = slotDetails;

  obj.adSlots = adSlots;

  pageData[objIndex] = obj;

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
