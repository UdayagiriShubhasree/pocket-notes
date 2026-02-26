
import mongoose from "mongoose";

export default mongoose.model("Note",
  new mongoose.Schema({
    text: String,
    groupId: mongoose.Schema.Types.ObjectId,
    userId: mongoose.Schema.Types.ObjectId
  }, { timestamps: true })
);
