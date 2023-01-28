import { Request, Response } from "express"
import Chat from "./chat.model"

const createData = (req: Request, res: Response) => {
  const { name, user } = req.body
  const chat = new Chat({ name, user })
  try {
    return chat
      .save()
      .then(chat => res.status(200).json({ data: chat }))
      .catch((validate: any) => res.status(201).json({ data: validate.errors }))
  } catch (error) {
    console.log(error)
    return res.status(500).json({ error })
  }
}

const readAllData = async (req: Request, res: Response) => {
  try {
    const chat = await Chat
      .find()
      .populate('user')
      .select('-__v')
    return res.status(200).json({ data: chat })
  } catch (error) {
    return res.status(500).json({ error })
  }
}
const readData = async (req: Request, res: Response) => {
  const id = req.params.id

  try {
    const chat = await Chat
      .findById(id)
      .select('-__v')
    return chat ? res.status(200).json({ data: chat }) : res.status(404).json({ status: 'Not found' })
  } catch (error) {
    return res.status(500).json({ error })
  }
}
const updateData = async (req: Request, res: Response) => {
  const id = req.params.id

  return Chat
    .findById(id)
    .then(chat => {
      if (chat) {
        chat.set({
          name: req.body.name,
          isCompleted: req.body.isCompleted
        })

        return chat
          .save()
          .then(chat => res.status(200).json({ data: chat }))
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

  return Chat.findByIdAndDelete(id)
    .then(chat => chat ? res.status(200).json({ message: 'Deleted' }) : res.status(404).json({ message: 'Not found' }))
    .catch(error => res.status(500).json({ error }))
}

export { createData, readAllData, readData, updateData, deleteData }
