import { Schema, model } from "mongoose";

const courseSubSectionSchema = new Schema({
  title: {
    type: String,
    required: true,
    trim: true,
  },
  timeDuration: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    // required : true,
  },
  videoUrl: {
    type: String,
    required: true,
  },
  // additionUrl: [
  //   {
  //     type: String,
  //   },
  // ],
});

export default model("SubSection", courseSubSectionSchema);
