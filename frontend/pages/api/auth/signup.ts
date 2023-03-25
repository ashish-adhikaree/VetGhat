// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import axios from "axios";
import { setCookie } from "cookies-next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<any>
) {
  await axios
    .post(`${process.env.STRAPI}/api/auth/local/register`, {
      username: req.body.username,
      email: req.body.email,
      password: req.body.password,
    },
    {
      headers: { "Accept-Encoding": "gzip,deflate,compress" },
    })
    .then((response) => {
      setCookie("jwt", response.data.jwt, {
        req,
        res,
        httpOnly: true,
      });
      setCookie("uid", response.data.user.id, {
        req,
        res,
        httpOnly: true,
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
