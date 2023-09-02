import { Schema, model } from "mongoose";

const categorySchema = new Schema({
  categoryName: {
    type: String,
    required: true,
    trim: true,
  },
  description: {
    type: String,
  },
  course: [
    {
      type: Schema.Types.ObjectId,
      required: true,
    },
  ],
});

export default model("Category", categorySchema);
