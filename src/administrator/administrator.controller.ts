import { Request, Response } from "express"
import multer from 'multer'
import fs from 'fs'
import Administrator from "../auth/auth.model"

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    const dir = 'public/uploads'
    fs.mkdirSync(dir, { recursive: true })
    cb(null, dir);
  },
  filename: function (req, file, cb) {
    if (!req.body.filename) {
      cb(null, 'empty')
    } else {
      const name = file.originalname.toLowerCase().split(' ').join('_');
      cb(null, Date.now() + name)
    }
  }
});
export const upload = multer({ storage: storage }).single('image');

const createData = (req: any, res: Response) => {
  const url = req.protocol + '://' + req.get("host")
  const administrator = new Administrator({
    name: req.body.name !== 'undefined' ? req.body.name : '',
    image: req.file?.filename !== undefined ? url + '/uploads/' + req.file?.filename : ''
  })
  try {
    return administrator
      .save()
      .then(administrator => res.status(200).json({ data: administrator }))
      .catch((validate: any) => res.status(201).json({ data: validate.errors }))
  } catch (error) {
    console.log(error)
  }
}
const readAllData = async (req: Request, res: Response) => {
  try {
    const administrator = await Administrator
      .find()
      .select('-__v')
    return res.status(200).json({ data: administrator })
  } catch (error) {
    return res.status(500).json({ error })
  }
}
const readData = async (req: Request, res: Response) => {
  const id = req.params.id

  try {
    const administrator = await Administrator
      .findById(id)
      .select('-__v')
    return administrator ? res.status(200).json({ data: administrator }) : res.status(404).json({ message: 'Not found' })
  } catch (error) {
    return res.status(500).json({ error })
  }
}
const updateData = async (req: Request, res: Response) => {
  const id = req.params.id
  const url = req.protocol + '://' + req.get("host") + '/uploads/'
  return Administrator
    .findById(id)
    .then(administrator => {
      if (administrator) {
        if (req.file) {
          const image = administrator && administrator.image.replace(url, "") || ''
          fs.unlinkSync(`public/uploads/${image}`)
          administrator.set({
            name: req.body.name !== 'undefined' ? req.body.name : '',
            image: req.file?.filename !== undefined ? url + req.file?.filename : ''
          })
        } else {
          administrator.set({
            name: req.body.name !== 'undefined' ? req.body.name : '',
            image: administrator.image
          })
        }

        return administrator
          .save()
          .then(administrator => res.status(200).json({
            status: 200,
            data: administrator
          }))
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
  const url = req.protocol + '://' + req.get("host") + '/uploads/'
  const administrators = await Administrator.findById(id) as any

  const image = administrators && administrators.image.replace(url, "") || ''
  return Administrator.findByIdAndDelete(id)
    .then(administrator => {
      if (administrator) {
        fs.unlinkSync(`public/uploads/${image}`)
        res.status(200).json({ data: 'Deleted successfully' })
      } else {
        res.status(404).json({ message: 'Not found' })
      }
    })
    .catch(error => res.status(500).json({ error }))
}

export { createData, readAllData, readData, updateData, deleteData }
