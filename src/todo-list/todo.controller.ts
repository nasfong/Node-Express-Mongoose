import { Request, Response } from "express"
import Todo from "./todo.model"

const createData = async (req: Request, res: Response) => {
  const { name, isCompleted } = req.body
  const todo = new Todo({ name, isCompleted })
  console.log(todo)
  try {
    try {
      const todo_1 = await todo
        .save()
      return res.status(200).json({ data: todo_1 })
    } catch (validate) {
      return res.status(201).json({ data: validate.errors })
    }
  } catch (error) {
    console.log(error)
  }
}
const readAllData = async (req: Request, res: Response) => {
  try {
    const todo = await Todo
      .find()
      .select('-__v')
    return res.status(200).json({ data: todo })
  } catch (error) {
    return res.status(500).json({ error })
  }
}
const readData = async (req: Request, res: Response) => {
  const id = req.params.id

  try {
    const todo = await Todo
      .findById(id)
      .select('-__v')
    return todo ? res.status(200).json({ data: todo }) : res.status(404).json({ status: 'Not found' })
  } catch (error) {
    return res.status(500).json({ error })
  }
}
const updateData = async (req: Request, res: Response) => {
  const id = req.params.id

  return Todo
    .findById(id)
    .then(todo => {
      if (todo) {
        todo.set({
          name: req.body.name,
          isCompleted: req.body.isCompleted
        })

        return todo
          .save()
          .then(todo => res.status(200).json({ data: todo }))
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

  return Todo.findByIdAndDelete(id)
    .then(todo => todo ? res.status(200).json({ message: 'Deleted' }) : res.status(404).json({ message: 'Not found' }))
    .catch(error => res.status(500).json({ error }))
}

export { createData, readAllData, readData, updateData, deleteData }
