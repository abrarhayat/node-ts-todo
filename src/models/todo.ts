import mongoose, { Schema, Document, Model } from "mongoose";

export interface TodoDocumentInterface extends Document {
  text: string;
}

const todoSchema = new Schema({
  text: {
    type: String,
    required: true,
  },
});

const ToDoModel: Model<TodoDocumentInterface> = mongoose.model("todo", todoSchema);

export default ToDoModel;
