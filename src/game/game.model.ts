import mongoose, { Schema } from "mongoose"

const GameSchema: Schema = new Schema(
  {
    name: { type: String, required: true },
    image: { type: String, required: true },
  },
  {
    timestamps: true,
  }
)

export default mongoose.model('Games', GameSchema)