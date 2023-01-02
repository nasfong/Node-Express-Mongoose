import { Request, Response } from "express"
import Menu from "./menu.model"

const createData = (req: Request, res: Response) => {
  const menu = new Menu(req.body)
  try {
    return menu
      .save()
      .then(menu => res.status(200).json({ data: menu }))
      .catch((validate: any) => res.status(201).json({data: validate.errors}))
  } catch (error) {
    console.log(error)
  }
}
const readAllData = async (req: Request, res: Response) => {
  try {
    const menu = await Menu
      .find()
      .select('-__v')
    return res.status(200).json({ data: menu })
  } catch (error) {
    return res.status(500).json({ error })
  }
}
const readData = async (req: Request, res: Response) => {
  const id = req.params.id

  try {
    const menu = await Menu
      .findById(id)
      .select('-__v')
    return menu ? res.status(200).json({ data: menu }) : res.status(404).json({ status: 'Not found' })
  } catch (error) {
    return res.status(500).json({ error })
  }
}
const updateData = async (req: Request, res: Response) => {
  const id = req.params.id

  return Menu
    .findById(id)
    .then(menu => {
      if (menu) {
        menu.set(req.body)

        return menu
          .save()
          .then(menu => res.status(200).json({ data: menu }))
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

  return Menu.findByIdAndDelete(id)
    .then(menu => menu ? res.status(200).json({ message: 'Deleted' }) : res.status(404).json({ message: 'Not found' }))
    .catch(error => res.status(500).json({ error }))
}

export { createData, readAllData, readData, updateData, deleteData }
