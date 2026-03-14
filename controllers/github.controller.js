import axios from "axios";
import User from "../models/user.model.js";

export const getGithubUser = async (req, res) => {
  console.log("GET /github/:username hit");

  try {
    const { username } = req.params;
   const existingUser = await User.findOne({ username });
    if (existingUser) {
      return res.json(existingUser);
    }
    // Add a timeout so the request doesn't hang forever if GitHub is unreachable
    const response = await axios.get(
      `https://api.github.com/users/${username}`,
      { timeout: 5000 }
    );

    const data = response.data;

    const user = new User({
      username: data.login,
      followers: data.followers,
      public_repos: data.public_repos,
      avatar_url: data.avatar_url,
    });

    await user.save();

    return res.json(user);
  } catch (error) {
    console.error("Error in getGithubUser:", error.message || error);
    return res
      .status(500)
      .json({ message: "Error fetching GitHub user", error: error.message });
  }
};