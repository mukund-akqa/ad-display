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
  const { refId, slotId, pageName } = req.body.data;

  let doc: doc = await faunaClient.query(
    q.Get(q.Ref(q.Collection("demo_collection"), refId))
  );

  let pageData = doc.data.publisherProfile.pages;
  let obj = pageData.find((x: any) => x.pageName == pageName);
  let index = pageData.indexOf(obj)
  console.log("Indexx",index)

  const updatedData = obj.adSlots.filter((item: any) => item.slotId != slotId);
//   console.log("updated Data", updatedData);

//   console.log(pageData);
//   console.log(obj.adSlots)
//   console.log("obj",obj)
//   console.log(updatedData)
  obj.adSlots=updatedData
  console.log(obj)


    pageData.slice(index,1,obj)
    console.log(pageData[0])
  console.log("pageData",pageData)
//   const newData=pageData.filter((item:any)=>item.pageName!=obj.pageName)

//   newData.push(obj)
//   console.log("newData",newData)
    let query = await faunaClient.query(
    q.Update(q.Ref(q.Collection("demo_collection"), refId), {
      data: {
        publisherProfile: {
          pages: pageData,
        },
      },
    })
  );
  // console.log(doc)
  res.status(200).json({ updatedData: pageData });
};
