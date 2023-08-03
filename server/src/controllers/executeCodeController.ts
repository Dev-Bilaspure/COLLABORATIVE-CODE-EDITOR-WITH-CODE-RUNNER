import { Request, Response } from "express";
import {
  INTERNAL_SERVER_ERROR,
  INVALID_REQUEST_BODY,
} from "../utils/errorTypes";
import { executeCodeSchema } from "../utils/validators";
import axios from "axios";

export const executeCode = async (req: Request, res: Response) => {
  try {
    try {
      executeCodeSchema.parse(req.body);
    } catch (error) {
      res.status(400).json({
        success: false,
        message: "Invalid request body",
        error,
        errorType: INVALID_REQUEST_BODY,
      });
      return;
    }
    const { code, language, input } = req.body;
    const response = await axios.post("https://api.jdoodle.com/v1/execute", {
      script: code,
      language: language,
      versionIndex: "0",
      stdin: input,
      clientId: process.env.JDOODLE_CLIENT_ID,
      clientSecret: process.env.JDOODLE_CLIENT_SECRET,
    });
    res.status(200).json({ success: true, data: response.data });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Internal server error",
      error,
      errorType: INTERNAL_SERVER_ERROR,
    });
  }
};
