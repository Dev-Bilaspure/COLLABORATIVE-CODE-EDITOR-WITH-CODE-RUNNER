import { Request, Response } from "express";
import {
  INTERNAL_SERVER_ERROR,
  INVALID_REQUEST_BODY,
} from "../utils/errorTypes";
import { createLiveShareCodeSchema } from "../utils/validators";
import CodeShareRoom from "../models/CodeShareRoom";

export const createCodeShareRoom = async (req: Request, res: Response) => {
  try {
    try {
      createLiveShareCodeSchema.parse(req.body);
    } catch (error) {
      res.status(400).json({
        success: false,
        message: "Invalid request body",
        error,
        errorType: INVALID_REQUEST_BODY,
      });
      return;
    }
    const newCodeShareRoom = new CodeShareRoom(req.body);
    const savedCodeShareRoom = await newCodeShareRoom.save();
    res.status(201).json({
      success: true,
      message: "Code share room created",
      room: savedCodeShareRoom.toObject(),
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Internal server error",
      error,
      errorType: INTERNAL_SERVER_ERROR,
    });
  }
};
