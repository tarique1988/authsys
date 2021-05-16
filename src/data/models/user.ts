import mongoose from "mongoose"
import bcrypt from "bcryptjs"

export interface IUser extends Document{
  _id: mongoose.Types.ObjectId,
  name: string,
  email: string,
  password: string
}

const UserSchema = new mongoose.Schema({
  _id: mongoose.Types.ObjectId,
  name: String,
  email: {
    type: String,
    unique: true,
    required: [true, "Email id is required to register!"]
  },
  password: {
    type: String,
    required: [true, "Password is required!"],
    minlength: [6, "Password must be at least 6 characters!"],
    select: false
  }
})

UserSchema.pre<IUser>("save", async function (next) {
  const salt = await bcrypt.genSalt(10)
  this.password = await bcrypt.hash(this.password, salt)
  next()
})

const User = mongoose.model<IUser>("User", UserSchema)

export default User