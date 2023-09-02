import { Schema, model } from "mongoose";

const userSchema = new Schema({
  name: {
    type: String,
    required: true,
    trim: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  accountType: {
    type: String,
    enum: ["Admin", "Student", "Instructor"],
    required: true,
  },
  additionDetails: {
    type: Schema.Types.ObjectId,
    ref: "Profile",
  },
  courses: [
    {
      type: Schema.Types.ObjectId,
      ref: "Course",
    },
  ],
  courseProgress: {
    type: Schema.Types.ObjectId,
    ref: "Progress",
  },
  img: {
    type: String,
    required: true,
  },
  token: {
    type: String,
  },
  expirationTime: {
    type: Date,
  },
});

export default model("User", userSchema);
