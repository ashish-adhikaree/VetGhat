import axios from "axios";
import { getCookie } from "cookies-next";
import { NextApiRequest, NextApiResponse } from "next";

export default async function Handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    const jwt = getCookie("jwt", { req, res });
    if (jwt === null || jwt === undefined) {
      res.status(200).json({ jwt: false });
    } else {
      try {
        await axios.get(`${process.env.STRAPI}/api/users/me`);
        res.status(200).json({ jwt: jwt });
      } catch {
        res.status(200).json({ jwt: false });
      }
    }
  } catch (err) {
    res.status(200).json({ jwt: false });
  }
}
