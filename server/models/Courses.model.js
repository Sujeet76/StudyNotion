import { Schema, model } from "mongoose";

const courseSchema = new Schema(
  {
    courseName: {
      type: String,
      required: true,
      trim: true,
    },
    courseDetails: {
      type: String,
      required: true,
    },
    instructor: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    WhatYouLearn: {
      type: String,
      // required: true,
    },
    courseContent: [
      {
        type: Schema.Types.ObjectId,
        ref: "Section",
      },
    ],
    ratingAndReview: [
      {
        type: Schema.Types.ObjectId,
        ref: "ReviewAndLike",
      },
    ],
    price: {
      type: Number,
      required: true,
    },
    thumbnail: {
      type: String,
      required: true,
    },
    tags: {
      type: [String],
      required: true,
    },
    category: {
      type: Schema.Types.ObjectId,
      ref: "Category",
    },
    studentEnrolled: [
      {
        type: Schema.Types.ObjectId,
        ref: "User",
      },
    ],
    status: {
      type: String,
      enum: ["Draft", "Published"],
    },
    instructions: {
      type: [String],
      required: true,
    },
    sold: {
      type: Number,
      default: 0,
    },
  },
  { timestamps: true }
);

export default model("Course", courseSchema);
