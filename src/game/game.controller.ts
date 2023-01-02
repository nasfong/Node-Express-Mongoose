import { Request, Response } from "express"
import multer from 'multer'
import fs from 'fs'
import Game from "./game.model"

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

const createData = async (req: Request, res: Response) => {
  console.log(req.file)
  const url = req.protocol + '://' + req.get("host")
  const game = new Game({
    name: req.body.name !== 'undefined' ? req.body.name : '',
    image: req.file?.filename !== undefined ? url + '/uploads/' + req.file?.filename : ''
  })
  try {
    try {
      const game_1 = await game
        .save();
      return res.status(200).json({ data: game_1 });
    } catch (validate) {
      return res.status(201).json({ data: validate.errors });
    }
  } catch (error) {
    console.log(error)
  }
}
const readAllData = async (req: Request, res: Response) => {
  try {
    const game = await Game
      .find()
      .select('-__v')
    return res.status(200).json({ data: game })
  } catch (error) {
    return res.status(500).json({ error })
  }
}
const readData = async (req: Request, res: Response) => {
  const id = req.params.id

  try {
    const game = await Game
      .findById(id)
      .select('-__v')
    return game ? res.status(200).json({ data: game }) : res.status(404).json({ message: 'Not found' })
  } catch (error) {
    return res.status(500).json({ error })
  }
}
const updateData = async (req: Request, res: Response) => {
  const id = req.params.id
  const url = req.protocol + '://' + req.get("host") + '/uploads/'
  console.log(req.file)
  return Game
    .findById(id)
    .then(game => {
      if (game) {
        if (req.file) {
          const image = game && game.image.replace(url, "") || ''
          fs.unlinkSync(`public/uploads/${image}`)
          game.set({
            name: req.body.name !== 'undefined' ? req.body.name : '',
            image: true ? url + req.file?.filename : ''
          })
        } else {
          game.set({
            name: req.body.name !== 'undefined' ? req.body.name : '',
            image: game.image
          })
        }

        return game
          .save()
          .then(game => res.status(200).json({
            status: 200,
            data: game
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
  const games = await Game.findById(id) as any

  const image = games && games.image.replace(url, "") || ''
  return Game.findByIdAndDelete(id)
    .then(game => {
      if (game) {
        fs.unlinkSync(`public/uploads/${image}`)
        res.status(200).json({ data: 'Deleted successfully' })
      } else {
        res.status(404).json({ message: 'Not found' })
      }
    })
    .catch(error => res.status(500).json({ error }))
}

export { createData, readAllData, readData, updateData, deleteData }
