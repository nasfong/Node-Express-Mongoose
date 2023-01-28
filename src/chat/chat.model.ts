import mongoose, { Schema } from "mongoose"

const ChatSchema: Schema = new Schema(
  {
    name: { type: String, required: true },
    user: {
      type: Schema.Types.ObjectId,
      required: true,
      ref: 'Auths'
    }
  },
  {
    timestamps: true,
    versionKey: false
  }
)

export default mongoose.model('Chats', ChatSchema)