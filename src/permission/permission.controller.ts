import { Request, Response } from "express"
import Permission from "./permission.model"
import Role from '../role/role.model'

const createData = (req: Request, res: Response) => {
  const { name, role } = req.body
  const permission = new Permission({ name, role })
  try {
    permission
      .save()
      .then(permission => res.status(200).json({ data: permission }))
      .catch((validate: any) => res.status(201).json({ data: validate.errors }))

  } catch (error) {
    res.status(500).json({ error })
  }
}
const readAllData = async (req: Request, res: Response) => {
  try {
    const Permissions = await Permission
      .find()
      .populate('role')
      .select('-__v')
    return res.status(200).json({ data: Permissions })
  } catch (error) {
    return res.status(500).json({ error })
  }
}
const readData = async (req: Request, res: Response) => {
  const id = req.params.id

  try {
    const permission = await Permission
      .findById(id)
      // .populate('role')
      .select('-__v')
    return permission ? res.status(200).json({ data: permission }) : res.status(404).json({ status: 'Not found' })
  } catch (error) {
    return res.status(500).json({ error })
  }
}
const updateData = async (req: Request, res: Response) => {
  const id = req.params.id
  const { name, role } = req.body

  try {
    const permission = await Permission.findById(id)
    if (permission) {
      const newPermission = permission._id.toString()
      try {
        if (permission.role) {
          permission.role.map(async (role) => {
            const roleAll = await Role.findById(role.toString())
            const oldPermission = roleAll.permission.map(permission => permission.toString())
            console.log(roleAll.permission.filter(filter => filter.toString().includes([newPermission])))
            roleAll.set({
              permission:
                newPermission.includes(oldPermission) ?
                  [newPermission]
                  :
                  roleAll.permission.filter(filter => filter.toString().includes([newPermission]))
            })
            roleAll.save()
          })
        }
      } catch (error) {
        res.status(404).json({ message: 'Not found' })
      }

      try {
        const permissionUpdate = permission.set({ name, role })



        permissionUpdate.save()
        res.status(200).json({ data: permissionUpdate })
      } catch (validate) {
        res.status(201).json({ data: validate.errors })
      }
    } else {
      res.status(404).json({ status: 'Not found' })
    }
  } catch (error) {
    res.status(500).json({ error })
  }
}
const deleteData = async (req: Request, res: Response) => {
  const id = req.params.id

  return Permission.findByIdAndDelete(id)
    .then(permission => permission ? res.status(200).json({ message: 'Deleted' }) : res.status(404).json({ message: 'Not found' }))
    .catch(error => res.status(500).json({ error }))
}

const readDropdown = async (req: Request, res: Response) => {
  try {
    let Permissions = await Permission.find() as any
    Permissions = Permissions.reduce((json, value, index) => {
      json[value._id] = value.name;
      return json
    }, {})
    return res.status(200).json(Permissions)
  } catch (error) {
    return res.status(500).json({ error })
  }
}

export { createData, readAllData, readData, updateData, deleteData, readDropdown }
