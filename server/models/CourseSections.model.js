import { Schema, model } from "mongoose";

const courseSectionSchema = new Schema({
  sectionName: {
    type: String,
    required: true,
    trim: true,
  },
  subSection: [
    {
      type : Schema.Types.ObjectId,
      ref: "SubSection",
      required: true,
    },
  ],
});

export default model("Section", courseSectionSchema);
