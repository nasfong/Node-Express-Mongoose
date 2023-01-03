import { Request, Response } from "express"
import AuthModel from "./auth.model"
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'

const register = async (req: Request, res: Response) => {


  //password bcrypt
  if (req.body.password) {
    const salt = await bcrypt.genSalt(10)
    const hashedPass = await bcrypt.hash(req.body.password, salt)
    req.body.password = hashedPass
  }


  const auth = new AuthModel(req.body)
  try {
    //user already exist
    const oldUser = await AuthModel.findOne({ username: req.body.username })
    if (oldUser) return res.status(400).json({ message: 'username is already registered' })

    //token
    const token = jwt.sign({
      username: auth.username,
      id: auth._id,
      firstname: auth.firstname,
      lastname: auth.lastname,
      role: auth.role
    }, 'MERN', { expiresIn: '1h' })

    return auth
      .save()
      .then(auth => res.status(200).json({
        data: auth,
        token: token
      }))
      .catch((validate) => res.status(201).json({
        data: validate.errors
      }))
  } catch (error) {
    res.status(500).json({ messgae: error.message })
  }

}

const login = async (req: Request, res: Response) => {
  const { username, password } = req.body

  try {
    const auth = await AuthModel.findOne({ username: username })

    if (auth) {
      const passwrod_check = await bcrypt.compare(password, auth.password)
      if (!passwrod_check) return res.status(202).json({ message: 'Wrong Password' })
      const token = jwt.sign({
        username: auth.username,
        id: auth._id,
        firstname: auth.firstname,
        lastname: auth.lastname,
        role: auth.role
      }, 'MERN', { expiresIn: '1h' })

      res.status(200).json({
        // data: auth,
        token: token
      })
    } else {
      res.status(202).json({ messsage: 'User dose not exist' })
    }
  } catch (error) {
    res.status(500).json({ messgae: error.message })
  }
}

const readUser = async (req: Request, res: Response) => {

}

export { register, login, readUser }