import type { NextApiRequest, NextApiResponse } from "next";
import { faunaClient } from "../../../../utils/fauna";
import { query as q } from "faunadb";

type Data = {
  pageData?: any;
  error?: string;
};

type doc = {
  data: any;
};
export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  const { refId, pageName, slotId, slotHeight, slotWidth } = req.body.data;
  let doc: doc = await faunaClient.query(
    q.Get(q.Ref(q.Collection("demo_collection"), refId))
  );
  let slot_details = {
    slotId: slotId,
    slotHeight: slotHeight,
    slotWidth: slotWidth,
  };

  let pageData = doc.data.publisherProfile.pages;
  let obj = pageData.find((x: any) => x.pageName == pageName);
  let objIndex = pageData.findIndex((index: any) => index.pageName == pageName);
  let adslot = obj.adSlots.find((slot: any) => slot.slotId == slotId);

  if (adslot) {
    res.status(400).json({ error: "slot already exists" });
  } else {
    obj.adSlots.push(slot_details);
    let query = await faunaClient.query(
      q.Update(q.Ref(q.Collection("demo_collection"), refId), {
        data: {
          publisherProfile: {
            pages: pageData,
          },
        },
      })
    );

    res.status(200).json({ pageData: pageData });
  }
}
