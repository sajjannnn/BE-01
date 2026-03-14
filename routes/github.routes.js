import express from "express";
import { getGithubUser } from "../controllers/github.controller.js";

const router = express.Router();

router.get("/github/:username", getGithubUser);

export default router;