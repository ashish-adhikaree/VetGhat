// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import axios from "axios";
import { setCookie } from "cookies-next";

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<any>
) {
  axios
    .post(`http://127.0.0.1:1337/api/auth/local`, {
      identifier: req.body.email,
      password: req.body.password,
    })
    .then((response) => {
      console.log(response.data);
      setCookie("jwt", response.data.jwt, {
        req,
        res,
        httpOnly: true,
        sameSite: true
      });
      setCookie("uid", response.data.user.id, {
        req,
        res,
        httpOnly: true,
        sameSite: true
      });
      res.status(200).json({ ...response.data });
    })
    .catch((error) => {
      try{
        res.status(error.response.data.error.status).json({...error.response.data.error});
      }catch(err){
        res.status(500).json({message: 'Something went wrong'})
      }
    });
}
