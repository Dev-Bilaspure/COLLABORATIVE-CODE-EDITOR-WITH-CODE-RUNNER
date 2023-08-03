import { env } from "@/env-controller";

export const SERVER_ORIGIN =
  env === "dev"
    ? "http://localhost:5000"
    : "https://online-ide-server.onrender.com";

export const EMPTY_STRING_EQUIVALENT = "&a%e8";
