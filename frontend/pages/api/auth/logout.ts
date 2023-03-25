import { deleteCookie } from "cookies-next";
import { NextApiRequest, NextApiResponse } from "next";

export default async function Handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    deleteCookie("jwt", { req, res });
    deleteCookie("uid", { req, res });
    res.status(200).json({message: 'Logged Out Successfully'})
  } catch (err) {
    res.status(500).json({ messsage: "Something went wrong" });
  }
}
