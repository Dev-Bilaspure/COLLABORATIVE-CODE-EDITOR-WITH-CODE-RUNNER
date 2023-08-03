import { z } from "zod";

export const createLiveShareCodeSchema = z
  .object({
    code: z.string(),
    language: z.string().nonempty(),
    input: z.string(),
    output: z.string(),
  })
  .strict();

export const editLiveShareCodeSchema = z
  .object({
    code: z.string(),
    language: z.string().nonempty(),
    input: z.string(),
    output: z.string(),
    roomId: z.string().nonempty(),
  })
  .strict();

export const joinRoomSchema = z
  .object({
    roomId: z.string().nonempty(),
  })
  .strict();

export const updateRoomDataSchema = z
  .object({
    roomId: z.string().nonempty(),
    code: z.string(),
    language: z.string().nonempty(),
    input: z.string(),
    output: z.string(),
  })
  .strict();

export const executeCodeSchema = z.object({
  code: z.string(),
  language: z.string().nonempty(),
  input: z.string(),
})