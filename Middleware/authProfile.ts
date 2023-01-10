import { NextFunction, Request, Response } from "express"
import { tokenDecode } from "./tokenMiddleware"


export const authProfile = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const token = req.headers.authorization.split(' ')[1]

    if (token) {
      const decoded = tokenDecode({ token })
      req.body._id = decoded?.id
      // console.log(decoded)
      res.status(200).json(decoded)
    }
    next()
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
}
