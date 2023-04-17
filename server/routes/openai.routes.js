import express from "express";

import {
  sentText,
  sentCode,
  sentAssist,
} from "../controllers/openai.controller.js";

const router = express.Router();

router.route("/text").post(sentText);
router.route("/code").post(sentCode);
router.route("/assist").post(sentAssist);

export default router;
