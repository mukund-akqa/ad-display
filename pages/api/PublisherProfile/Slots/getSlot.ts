import type { NextApiRequest, NextApiResponse } from "next";
import { faunaClient } from "../../../../lib/fauna";
import { query as q } from "faunadb";
import { Pages } from "@mui/icons-material";
type Data = {
    slotData:any;
  };

type doc = {
  data:any
}
export default async (req: NextApiRequest, res: NextApiResponse<Data>) => {
    const {refId,pageName,pageUrl} = req.body.data
    
    let doc:doc = await faunaClient.query(
        q.Get(q.Ref(q.Collection("demo_collection"), refId))
      );
    
    let pageData=doc.data.publisherProfile.pages
    let obj = pageData.find((x: any) => x.pageName == pageName);
    // console.log(pageData)
    // console.log("obj",obj.adSlots)
    
    
   
    
    res.status(200).json({ slotData: obj.adSlots });
}
