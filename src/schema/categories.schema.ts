import mongoose from "mongoose";

const subCategorySchema = new mongoose.Schema({
  id: { type: String, required: true, index: true, unique: true },
  name: { type: String, required: true, unique: true },
});
mongoose.model("SubCategory", subCategorySchema);

const CategoriesSchema = new mongoose.Schema(
  {
    id: { type: String, required: true, index: true, unique: true },
    name: { type: String, required: true, unique: true },
    SubCategory: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "SubCategory",
    },
    primary: { type: Boolean, required: true },
    createdAt: {
      type: Date,
      default: Date.now().toLocaleString(),
    },
    updatedAt: {
      type: Date,
      default: Date.now().toLocaleString(),
    },
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
