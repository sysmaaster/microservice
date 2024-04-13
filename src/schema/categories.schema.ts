import mongoose from "mongoose";

const CategoriesSchema = new mongoose.Schema(
  {
    id: { type: String, required: true , unique:true },
    C_NAME: { type: String, required: true },
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
