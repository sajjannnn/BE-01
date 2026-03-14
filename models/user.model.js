import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  username: String,
  followers: Number,
  public_repos: Number,
  avatar_url: String
});

export default mongoose.model("User", userSchema);