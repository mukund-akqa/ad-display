import type { NextApiRequest, NextApiResponse } from "next";
import { faunaClient } from "../../utils/fauna";
import { query as q } from "faunadb";

type Data = {
  email?: string;
  password?: string;
  error?: string;
  refId?: any;
};

type User = {
  user: user;
};
type user = {
  password: string;
  email: string;
};
type query = {
  data: User;
  ref: any;
};
const bcrypt = require("bcrypt");
export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  const { email, password } = req.body.data;

  try {
    let query: query = await faunaClient.query(
      q.Get(q.Match(q.Index("email_index"), email))
    );
    let refId = query.ref.id;
    const isMatch = await bcrypt.compare(password, query.data.user.password);
    if (email === query.data.user.email && isMatch) {
      res.status(200).json({ email: email, password: password, refId: refId });
    } else {
      res.status(400).send({ error: "Invalid Credentials" });
    }
  } catch (e: any) {
    res.status(400).json({ error: e.message });
  }
}
