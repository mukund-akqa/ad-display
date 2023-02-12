import type { NextApiRequest, NextApiResponse } from "next";
import { faunaClient } from "../../../../lib/fauna";
import { query as q } from "faunadb";

type Data = {
    pageData:any;
  };

type doc = {
  data:any
}
export default async function handler(req: NextApiRequest, res: NextApiResponse<Data>)  {
    const {refId} = req.body.data
    
    let doc:doc = await faunaClient.query(
        q.Get(q.Ref(q.Collection("demo_collection"), refId))
      );
    // console.log("pagename",pageName)
    let pageData=doc.data.advertizerProfile.matchingCriteria.includePublishers
    
    
   
    // console.log(pageData)
    // console.log(doc)
    res.status(200).json({ pageData: pageData });
}