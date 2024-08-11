import express from "express";

import isAuthenticated from "../middlewares/isAuthenticated.js";
import upload from "../middlewares/multer.js";
import { getMessage, sendMessage } from "../controllers/message_controller.js";

const router=express.Router();
router.route('/send/:id').post(isAuthenticated,sendMessage);
router.route('/send/:id').post(isAuthenticated,getMessage);
export default router;
