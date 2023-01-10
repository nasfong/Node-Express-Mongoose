import { NextFunction, Request, Response } from "express"
import { tokenDecode } from "./tokenMiddleware"


export const authMiddleware = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const token = req.headers.authorization.split(' ')[1]

    if (token) {
      const decoded = tokenDecode({ token })
      req.body._id = decoded?.id
    }
    next()
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
}
