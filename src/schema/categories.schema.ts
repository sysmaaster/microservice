import mongoose from "mongoose";

const CategoriesSchema = new mongoose.Schema(
  {
    id: { type: String, required: true, index: true, unique: true },
    name: { type: String, required: true, unique: true },
    created: { type: String, default: Date.now },
  },
  {
    collection: "categories",
    versionKey: false,
  }
);

export default mongoose.model("categories", CategoriesSchema);

/*
{
  "id":"::random.gen",
  "W_NAME": "test Комуналка",
}
 */
