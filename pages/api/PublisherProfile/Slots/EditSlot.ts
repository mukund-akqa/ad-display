import type { NextApiRequest, NextApiResponse } from "next";
import { faunaClient } from "../../../../lib/fauna";
import { query as q } from "faunadb";

type Data = {
  name: string;
};

type doc = {
  data: any;
};
export default async function handler(req: NextApiRequest, res: NextApiResponse<Data>)  {
  const { refId, slotId, slotWidth, slotHeight, id, pageName } = req.body.data;
  let doc: doc = await faunaClient.query(
    q.Get(q.Ref(q.Collection("demo_collection"), refId))
  );
  console.log(slotId);
  console.log(slotHeight);
  console.log(slotWidth);
  console.log(pageName);
  console.log(id);
  //   let pageDetails = {
  //     pageName: pageName,
  //     pageUrl: pageUrl,
  //     adSlots:[]
  //   };
  let slotDetails = {
    slotId: slotId,
    slotHeight: slotHeight,
    slotWidth: slotWidth,
  };
  let pageData = doc.data.publisherProfile.pages;
  //   let obj = pageData[id];
  console.log(pageData)
  let obj = pageData.find((x: any) => x.pageName == pageName);
  let objIndex = pageData.findIndex((index: any) => index.pageName == pageName);
  console.log("objIndex",objIndex)
  console.log("obj", obj);
  const adSlots = obj.adSlots;
  
  
  
  console.log("adSlots", adSlots);
  adSlots[id]=slotDetails
  console.log(adSlots)
  obj.adSlots=adSlots
  console.log(obj)
  pageData[objIndex]=obj
  console.log("NewPageData",pageData)
  console.log(pageData[objIndex])

  ;
  


  //   let objIndex = pageData.findIndex((index: any) => index.pageName == pageName);
  //   obj.pageName=pageName,
  //   obj.pageUrl=pageUrl
  //   pageData.slice(objIndex,1,obj)

  //   console.log(pageData);
  //   console.log(obj);
  //   obj.pageName = pageName;
  //   obj.pageUrl = pageUrl;
  //   console.log("Updated obj", obj);
  //   pageData.slice(id, 1, obj);
  //   console.log(pageData);

  //   oldData.push(pageDetails);
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
};
