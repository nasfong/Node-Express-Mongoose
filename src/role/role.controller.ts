import { Request, Response } from "express"
import Role from "./role.model"

const createData = (req: Request, res: Response) => {
  const { name, permission } = req.body
  const role = new Role({ name, permission })
  role.populate('permission')
  try {
    return role
      .save()
      .then(role => res.status(200).json({ data: role }))
      .catch((validate: any) => res.status(201).json({ data: validate.errors }))
  } catch (error) {
    res.status(500).json({ error })
  }
}
const readAllData = async (req: Request, res: Response) => {
  try {
    const roles = await Role
      .find()
      .populate('permission')
      // .select('-__v')
    return res.status(200).json({ data: roles })
  } catch (error) {
    return res.status(500).json({ error })
  }
}
const readData = async (req: Request, res: Response) => {
  const id = req.params.id

  try {
    const role = await Role
      .findById(id)
      // .populate('permission')
      .select('-__v')
    return role ? res.status(200).json({ data: role }) : res.status(404).json({ status: 'Not found' })
  } catch (error) {
    return res.status(500).json({ error })
  }
}
const updateData = async (req: Request, res: Response) => {
  const id = req.params.id
  const { name, permission } = req.body

  return Role
    .findById(id)
    .then(role => {
      if (role) {
        role.set({ name, permission })
          .populate('permission')

        return role
          .save()
          .then(role => res.status(200).json({ data: role }))
          .catch((validate: any) => res.status(201).json({ data: validate.errors }))
      } else {
        res.status(404).json({ status: 'Not found' })
      }

    }
    )
    .catch(error => res.status(500).json({ error }))
}
const deleteData = async (req: Request, res: Response) => {
  const id = req.params.id

  return Role.findByIdAndDelete(id)
    .then(role => role ? res.status(200).json({ message: 'Deleted' }) : res.status(404).json({ message: 'Not found' }))
    .catch(error => res.status(500).json({ error }))
}

const readDropdown = async (req: Request, res: Response) => {
  try {
    let roles = await Role.find() as any
    roles = roles.reduce((json, value, index) => {
      json[value._id] = value.name;
      return json
    }, {})
    return res.status(200).json(roles)
  } catch (error) {
    return res.status(500).json({ error })
  }
}

export { createData, readAllData, readData, updateData, deleteData, readDropdown }
