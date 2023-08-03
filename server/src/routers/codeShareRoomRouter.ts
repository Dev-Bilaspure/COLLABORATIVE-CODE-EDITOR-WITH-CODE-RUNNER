import { Router, Request, Response } from "express";
import { createCodeShareRoom } from "../controllers/codeShareRoomController";

const router = Router();

router.post("/", createCodeShareRoom);

export default router;
