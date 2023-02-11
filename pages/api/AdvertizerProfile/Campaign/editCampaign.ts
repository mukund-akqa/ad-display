import type { NextApiRequest, NextApiResponse } from "next";
import { faunaClient } from "../../../../lib/fauna";
import { query as q } from "faunadb";

type Data = {
    name: string;
  };
  
  type doc = {
    data: any;
  };
  export default async (req: NextApiRequest, res: NextApiResponse<Data>) => {
    const { refId, campaignName, landingPageUrl, id } = req.body.data;
    let doc: doc = await faunaClient.query(
      q.Get(q.Ref(q.Collection("demo_collection"), refId))
    );
    
    let campaignData = doc.data.advertizerProfile.campaigns;
    let obj = campaignData[id];
    //   let obj = pageData.find((x: any) => x.pageName == pageName);
    //   let objIndex = pageData.findIndex((index: any) => index.pageName == pageName);
    //   obj.pageName=pageName,
    //   obj.pageUrl=pageUrl
    //   pageData.slice(objIndex,1,obj)
  
    // console.log(pageData);
    // console.log(obj);
    obj.campaignName = campaignName;
    obj.landingPageUrl = landingPageUrl;
    console.log("Updated obj", obj);
    campaignData.slice(id, 1, obj);
    // console.log(pageData);
  
    //   oldData.push(pageDetails);
    let query = await faunaClient.query(
      q.Update(q.Ref(q.Collection("demo_collection"), refId), {
        data: {
          advertizerProfile: {
            campaigns: campaignData,
          },
        },
      })
    );
    res.status(200).json({ name: "John Doe" });
  };
  