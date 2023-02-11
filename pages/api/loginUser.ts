import type { NextApiRequest, NextApiResponse } from "next";
import { faunaClient } from "../../lib/fauna";
import { query as q } from "faunadb";

type Data = {
  email?: string;
  password?: string;
  error?:string
  refId?:any
};

type User={
    user:user
}
type user={
    password:string,
    email:string,
    
}
type query = {
    data:User,
    ref:any

}
const bcrypt = require('bcrypt');
export default async (req: NextApiRequest, res: NextApiResponse<Data>) => {
  const { email, password } = req.body.data;
  console.log(email);
  
  try{
    let query : query= await faunaClient.query(
        q.Get(q.Match(q.Index("email_index"), email)))
        let refId=query.ref.id
        const isMatch = await bcrypt.compare(password, query.data.user.password);
        if(email===query.data.user.email && isMatch){
            res.status(200).json({ email: email, password: password, refId:refId });
            console.log("login successful");
        }else{
            res.status(500).send({error:"Invalid Credentials"})
        }
       
  }catch(e:any){
    res.status(500).json({error:e.message})
  }

  
  
// console.log(query)
// console.log(query.data.user.password);

 
};


