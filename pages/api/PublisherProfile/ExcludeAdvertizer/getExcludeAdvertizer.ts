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
    let pageData=doc.data.publisherProfile.matchingCriteria.excludeAdvertizers
    
    
   
    
    res.status(200).json({ pageData: pageData });
}