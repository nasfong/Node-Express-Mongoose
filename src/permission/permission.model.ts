import mongoose, { Schema } from "mongoose"

const PermissionSchema: Schema = new Schema(
  {
    name: { type: String, required: true },
    role: [{
      type: Schema.Types.ObjectId,
      required: true,
      ref: 'Roles'
    }],
  },
  {
    timestamps: true,
  }
)

export default mongoose.model('Permissions', PermissionSchema)