import { Request, Response } from "express"
import Administrator from "../auth/auth.model"
import bcrypt from 'bcrypt'

const createData = async (req: Request, res: Response) => {
  const { firstname, lastname, username, role } = req.body


  if (req.body.password) {
    const salt = await bcrypt.genSalt(10)
    const hashedPass = await bcrypt.hash(req.body.password, salt)
    req.body.password = hashedPass
  }

  const administrator = new Administrator({
    firstname,
    lastname,
    username,
    password: req.body.password,
    role
  })
  administrator.populate('role')


  try {
    return administrator
      .save()
      .then(administrator => res.status(200).json({ data: administrator }))
      .catch((validate: any) => res.status(201).json({ data: validate.errors }))
  } catch (error) {
    return res.status(500).json({ error })
  }
}
const readAllData = async (req: Request, res: Response) => {
  try {
    let administrators = await Administrator
      .find()
      .populate('role')
      .select('-__v')
    administrators = administrators.map((administrator) => {
      const { password, ...otherDetails } = administrator._doc
      return otherDetails
    })
    return res.status(200).json({ data: administrators })
  } catch (error) {
    return res.status(500).json({ error })
  }
}
const readData = async (req: Request, res: Response) => {
  const id = req.params.id

  try {
    const administrator = await Administrator
      .findById(id)
      .populate('role')
      .select('-__v')
    if (administrator) {
      const { password, ...otherDtails } = administrator._doc

      res.status(200).json(otherDtails)
    }
  } catch (error) {
    return res.status(500).json({ error })
  }
}
const updateData = async (req: Request, res: Response) => {
  const id = req.params.id
  const { firstname, lastname, username, role } = req.body

  if (req.body.password) {
    const salt = await bcrypt.genSalt(10)
    const hashedPass = await bcrypt.hash(req.body.password, salt)
    req.body.password = hashedPass
  }

  return Administrator
    .findById(id)
    .select('-__v')
    .then(administrator => {
      if (administrator) {
        administrator.set({
          firstname,
          lastname,
          role,
          username,
          password: req.body.password,
        })
          .populate('role')

        return administrator
          .save()
          .then(administrator => res.status(200).json({ data: administrator }))
          .catch((validate: any) => res.status(201).json({ data: validate.errors }))
      } else {
        res.status(404).json({ message: 'Not found' })
      }

    }
    )
    .catch(error => res.status(500).json({ error }))
}
const deleteData = async (req: Request, res: Response) => {
  const id = req.params.id

  return Administrator.findByIdAndDelete(id)
    .then(administrator => {
      if (administrator) {
        // fs.unlinkSync(`public/uploads/${image}`)
        res.status(200).json({ data: 'Deleted successfully' })
      } else {
        res.status(404).json({ message: 'Not found' })
      }
    })
    .catch(error => res.status(500).json({ error }))
}

export { createData, readAllData, readData, updateData, deleteData }
