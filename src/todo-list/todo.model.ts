import mongoose, { Schema } from "mongoose"

const TodoSchema: Schema = new Schema(
  {
    name: { type: String, required: true },
    isCompleted: { type: Boolean, required: true },
  },
  {
    timestamps: true,
  }
)

export default mongoose.model('Todos', TodoSchema)