import type { NextApiRequest, NextApiResponse } from "next";
import { faunaClient } from "../../utils/fauna";
import { query as q, Ref } from "faunadb";

type Data = {
  name?: string;
  email?: string;
  password?: string;
  phone?: string;
  siteName?: string;
  refId?: number;
  error?: string;
};

type query = {
  ref: any;
};
const bcrypt = require("bcrypt");
export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  const { name, email, password, phone, siteName } = req.body.data;

  let check = await faunaClient.query(
    q.Exists(q.Match(q.Index("email_index"), email))
  );

  if (check) {
    res.status(400).json({ error: "email already exists" });
  } else {
    const hashPassword = await bcrypt.hash(password, 10);
    let query: query = await faunaClient.query(
      q.Create(q.Collection("demo_collection"), {
        data: {
          user: {
            name: name,
            email: email,
            password: hashPassword,
            phone: phone,
            siteName: siteName,
          },

          publisherProfile: {
            pages: [],
            matchingCriteria: {
              includeAdvertizers: [],
              excludeAdvertizers: [],
            },
          },
          advertizerProfile: {
            campaigns: [],
            matchingCriteria: {
              includePublishers: [],
              excludePublishers: [],
            },
          },
        },
      })
    );
    let refId = query.ref.id;

    res.status(200).json({
      name: name,
      email: email,
      password: password,
      phone: phone,
      refId: refId,
      siteName: siteName,
    });
  }
}
