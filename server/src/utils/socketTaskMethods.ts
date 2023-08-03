import CodeShareRoom from "../models/CodeShareRoom";
import {
  INTERNAL_SERVER_ERROR,
  INVALID_DATA,
  RESOURCE_NOT_FOUND,
} from "./errorTypes";
import { joinRoomSchema, updateRoomDataSchema } from "./validators";

export const getRoomData = async (data: any) => {
  try {
    // Validate data
    try {
      joinRoomSchema.parse(data);
    } catch (error) {
      return {
        error: error,
        message: "Invalid data",
        errorType: INVALID_DATA,
        success: false,
      };
    }

    const { roomId } = data;
    const room = await CodeShareRoom.findOne({ _id: roomId });

    // Check if room exists
    if (!room) {
      return {
        message: "Room not found",
        errorType: RESOURCE_NOT_FOUND,
        success: false,
      };
    }

    // return room data
    return {
      success: true,
      message: "Room found",
      room: room.toObject(),
    };
  } catch (error) {
    return {
      error: error,
      message: "Internal server error",
      errorType: INTERNAL_SERVER_ERROR,
      success: false,
    };
  }
};

export const updateRoomData = async (data: any) => {
  try {
    // Validate data
    try {
      updateRoomDataSchema.parse(data);
    } catch (error) {
      return {
        error: error,
        message: "Invalid data",
        errorType: INVALID_DATA,
        success: false,
      };
    }
    const { roomId, code, input, output, language } = data;
    const room = await CodeShareRoom.findOne({ _id: roomId });

    // Check if room exists
    if (!room) {
      return {
        message: "Room not found",
        errorType: RESOURCE_NOT_FOUND,
        success: false,
      };
    }
    
    // Updating room data
    room.code = code;
    room.input = input;
    room.output = output;
    room.language = language;

    const updatedRoom = await room.save();

    return {
      success: true,
      message: "Room updated",
      room: updatedRoom.toObject(),
    };
  } catch (error) {
    return {
      error: error,
      message: "Internal server error",
      errorType: INTERNAL_SERVER_ERROR,
      success: false,
    };
  }
};
