import mongoose, { Schema } from "mongoose"

const RoleSchema: Schema = new Schema(
  {
    name: { type: String, required: true },
    permission: [{
      type: Schema.Types.ObjectId,
      required: true,
      ref: 'Permissions'
    }],
  },
  {
    timestamps: false,
    versionKey: false
  },
)

export default mongoose.model('Roles', RoleSchema)