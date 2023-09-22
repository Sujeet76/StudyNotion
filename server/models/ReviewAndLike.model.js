import { Schema, model } from "mongoose";

const reviewAndLikeSchema = new Schema(
  {
    user: {
      type: Schema.Types.ObjectId,
      required: true,
      ref: "User",
    },
    rating: {
      type: Number,
      required: true,
    },
    review: {
      type: String,
    },
    course: {
      type: Schema.Types.ObjectId,
      required: true,
      ref: "Course",
    },
  },
  { timestamps: true }
);

export default model("ReviewAndLike", reviewAndLikeSchema);
