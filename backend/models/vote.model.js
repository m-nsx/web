import mongoose from "mongoose";

const voteSchema = new mongoose.Schema({
  username: { 
    type: String,
    required: true,
    unique: true
  },
  candidate: {
    type: String,
    required: true
  },
  title: {
    type: String,
    required: true
  },
  score: {
    type: Number, 
    required: true
  },
});

const Vote = mongoose.model('Vote', voteSchema);

export default Vote;