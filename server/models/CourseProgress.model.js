import { Schema, model } from "mongoose";

const progressSchema = new Schema({
  courseId: {
    type: String,
    required: true,
  },
  completedVideos: [
    {
      type: Schema.Types.ObjectId,
      ref: "SubSection",
      required: true,
    },
  ],
});

export default model("Progress", progressSchema);
