import mongoose from "mongoose";

const CodeShareRoomSchema = new mongoose.Schema(
  {
    code: {
      type: String,
      default: ""
    },
    language: {
      type: String,
      required: true,
    },
    input: {
      type: String,
      default: "",
    },
    output: {
      type: String,
      default: "",
    },
  },
  {
    timestamps: true,
  }
);

const CodeShareRoom = mongoose.model("CodeShareRoom", CodeShareRoomSchema);

export default CodeShareRoom;
