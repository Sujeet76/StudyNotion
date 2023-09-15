import { Schema, Types, model } from "mongoose";

const progressSchema = new Schema({
  courseId: {
    type: Types.ObjectId,
    ref : "Course"
  },
  userId: {
    type: Types.ObjectId,
    ref : "User"
  },
  completedVideos: [
    {
      type: Types.ObjectId,
      ref: "SubSection",
      required: true,
    },
  ],
});

export default model("Progress", progressSchema);
