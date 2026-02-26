
import mongoose from "mongoose";

export default mongoose.model("Group",
  new mongoose.Schema({
    name: String,
    color: String,
    userId: mongoose.Schema.Types.ObjectId
  }, { timestamps: true })
);
