import mongoose, { Schema } from "mongoose"

const MenuSchema: Schema = new Schema(
  {
    name: { type: String, required: true },
    url: { type: String, required: true },
    icon: { type: String, required: true },
  },
  {
    timestamps: true,
  }
)

export default mongoose.model('Menus', MenuSchema)