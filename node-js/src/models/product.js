import mongoose from "mongoose";

const { Schema } = mongoose;

const productSchema = new Schema({
  name: {
    type: String,
    require: true,
    minLength: 3,
  },
  price: {
    type: Number,
    require: true,
  },
  description: {
    type: String,
  },
  image: {
    type: String,
  },
  categoryId: {
    type: mongoose.Types.ObjectId,
    ref: "Category",
  }
});

export default mongoose.model("Products", productSchema);