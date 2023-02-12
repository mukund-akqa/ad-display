import type { NextApiRequest, NextApiResponse } from "next";
import { faunaClient } from "../../../../lib/fauna";
import { query as q } from "faunadb";
import { Pages } from "@mui/icons-material";
type Data = {
  updatedData: any;
};

type doc = {
  data: any;
};
export default async function handler(req: NextApiRequest, res: NextApiResponse<Data>)  {
  const { refId, pageName } = req.body.data;

  let doc: doc = await faunaClient.query(
    q.Get(q.Ref(q.Collection("demo_collection"), refId))
  );
  // console.log("pagename",pageName)
  let pageData = doc.data.publisherProfile.pages;
  const updatedData = pageData.filter(
    (item: any) => item.pageName != pageName
  );
  console.log("updated Data",updatedData)

  console.log(pageData);
  let query = await faunaClient.query(
    q.Update(q.Ref(q.Collection("demo_collection"), refId), {
      data: {
        publisherProfile: {
          pages:updatedData
        },
      },
    })
  );
  // console.log(doc)
  res.status(200).json({ updatedData: updatedData });
};
