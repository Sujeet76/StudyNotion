import { Schema, model } from "mongoose";

const userProfileSchema = new Schema({
  gender: {
    type: String,
  },
  dateOfBirth: {
    type: String,
  },
  about: {
    type: String,
    // maxLength: 50,
  },
  contactNumber: {
    type: Number,
  },
  address: {
    type: String,
  },
});

export default model("Profile", userProfileSchema);
