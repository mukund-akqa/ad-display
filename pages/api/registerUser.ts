import type { NextApiRequest, NextApiResponse } from "next";
import { faunaClient } from "../../lib/fauna";
import { query as q, Ref } from "faunadb";


type Data = {
  name: string;
  email: string;
  password: string;
  phone: string;
  siteName: string;
  refId: number;
};

type query = {
  ref: any;
};
const bcrypt = require('bcrypt');
export default async (req: NextApiRequest, res: NextApiResponse<Data>) => {
  const { name, email, password, phone, siteName } = req.body.data;
  const hashPassword = await bcrypt.hash(password, 10);
  let query: query = await faunaClient.query(
    q.Create(q.Collection("demo_collection"), {
      data: {
        user: {
          name: name,
          email: email,
          password: hashPassword,
          phone: phone,
          siteName:siteName
        },
        
        publisherProfile: {
          pages: [],
          matchingCriteria: {
            includeAdvertizers: [],
            excludeAdvertizers: [],
          },
        },
        advertizerProfile: {
          campaigns:[],
          matchingCriteria: {
            includePublishers: [],
            excludePublishers: [],
          },
        },
      },
    })
  );
  let refId = query.ref.id;
  console.log(query);
  console.log(refId);

  //   query.data.map()

  // res.status(200).json({ name: 'John Doe' })
  res
    .status(200)
    .json({
      name: name,
      email: email,
      password: password,
      phone: phone,
      refId: refId,
      siteName: siteName,
    });
  //   res.send({name:name,email:email,password:password,copassword:copassword,refId:refId })
};
