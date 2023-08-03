import CodeEditor from "@/components/CodeEditor/CodeEditor";
import CodeShareDNE from "@/components/CodeShareDNE";
import IODrawer from "@/components/IODrawer";
import Navbar from "@/components/Navbar";
import SEO from "@/components/SEO";
import { EMPTY_STRING_EQUIVALENT, SERVER_ORIGIN } from "@/contants";
import { useStore } from "@/store/useStore";
import { getDefaultCode } from "@/utils/defaultCodes";
import { RESOURCE_NOT_FOUND } from "@/utils/errorTypes";
import { formatDate } from "@/utils/helperMethods";
import { handleRoomDataChangeFunction } from "@/utils/types";
import { Alert, Snackbar } from "@mui/material";
import mongoose from "mongoose";
import React, { useEffect, useState } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import io, { Socket } from "socket.io-client";
import debounce from "lodash.debounce";
import { debug_mode } from "@/debug-controller";

const CodeShare = () => {
  const [code, setCode] = React.useState("");
  const [socket, setSocket] = useState<Socket | null>(null);
  const [isConnected, setIsConnected] = useState<boolean>(false);
  const [showCodeCreatedSuccess, setShowCodeCreatedSuccess] = useState(false);
  const [isResourceNotFound, setIsResourceNotFound] = useState(false);
  const [roomCreatedAt, setRoomCreatedAt] = useState<string>("");

  const location = useLocation();

  const {
    data: { language, input, output },
    actions: { setLanguage, setInput, setOutput },
  } = useStore();

  const { roomId } = useParams();
  debug_mode && console.log({ roomId });

  useEffect(() => {
    if (!roomId || !mongoose.Types.ObjectId.isValid(roomId)) {
      setIsResourceNotFound(true);
      debug_mode && console.log("invalid room id");
      return;
    }
  }, []);

  useEffect(() => {
    const isShowCodeCreatedSuccessViewed = sessionStorage.getItem(
      "isShowCodeCreatedSuccessViewed"
    );
    if (location.state?.message && isShowCodeCreatedSuccessViewed !== "true") {
      setShowCodeCreatedSuccess(true);
    }
  }, []);

  useEffect(() => {
    if (!isConnected || isResourceNotFound) return;
    socket?.emit("joinRoom", { roomId });
  }, [isConnected]);

  useEffect(() => {
    if (isResourceNotFound) return;
    const socketTemp = io(SERVER_ORIGIN);
    setSocket(socketTemp);
    return () => {
      socket?.close();
    };
  }, []);
  useEffect(() => {
    document.body.style.overflowY = "hidden";
    return () => {
      document.body.style.overflowY = "auto";
    };
  }, []);

  useEffect(() => {
    if (isResourceNotFound) return;
    socket?.on("connect", () => {
      console.log("connected");
      setIsConnected(true);
    });

    socket?.on("joinRoomResponse", (data) => {
      if (data.success) {
        setLanguage(data.room.language);
        setCode(data.room.code);
        setInput(data.room.input);
        setOutput(data.room.output);
        setRoomCreatedAt(data.room.createdAt);
        debug_mode && console.log("room joined successfully", data);
      } else {
        if (data.errorType === RESOURCE_NOT_FOUND) {
          setIsResourceNotFound(true);
          console.log("error joining room", data);
          return;
        }
        console.log("error joining room", data);
      }
    });
    socket?.on("roomDataChangeResponse", (data) => {
      if (data.success) {
        setLanguage(data.room.language);
        setCode(data.room.code);
        setInput(data.room.input);
        setOutput(data.room.output);
        debug_mode && console.log("room data changed successfully", data);
      } else {
        debug_mode && console.log("error changing room data", data);
      }
    });
    socket?.on("userDisconnected", (data) => {
      console.log("a user disconnected", data);
    });

    socket?.on("newUserJoined", (data) => {
      console.log("a new user joined", data);
    });

    socket?.on("disconnect", () => {
      console.log("disconnected");
      setIsConnected(false);
    });
  }, [socket]);

  const handleRoomDataChange: handleRoomDataChangeFunction = ({
    newLanguage,
    newInput,
    newOutput,
    newCode,
  }) => {
    const data = {
      code:
        (newCode || code) === EMPTY_STRING_EQUIVALENT ? "" : newCode || code,
      language: newLanguage || language,
      input:
        (newInput || input) === EMPTY_STRING_EQUIVALENT
          ? ""
          : newInput || input,
      output: newOutput || output,
    };
    socket?.emit("roomDataChange", {
      roomId,
      ...data,
    });
  };
  const debouncedHandleRoomDataChange = debounce(handleRoomDataChange, 700);
  return isResourceNotFound ? (
    <CodeShareDNE />
  ) : (
    <div>
      <SEO options={{ title: `${formatDate(roomCreatedAt)} - Codelive` }} />
      <Navbar code={code} handleRoomDataChange={handleRoomDataChange} />
      <CodeEditor
        onChange={(newValue) => {
          setCode(newValue);
          debouncedHandleRoomDataChange({
            newCode: newValue.length > 0 ? newValue : EMPTY_STRING_EQUIVALENT,
          });
        }}
        value={code}
        style={{ marginTop: 42 }}
        readOnly={!isConnected}
        debouncedHandleRoomDataChange={debouncedHandleRoomDataChange}
      />
      <Snackbar
        open={!isConnected}
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
        style={{ marginTop: 20 }}
      >
        <Alert severity="info">
          <p className="pr-3">Trying to connect</p>
        </Alert>
      </Snackbar>
      <Snackbar
        open={showCodeCreatedSuccess}
        onClose={() => {
          setShowCodeCreatedSuccess(false);
          sessionStorage.setItem("isShowCodeCreatedSuccessViewed", "true");
        }}
        autoHideDuration={3000}
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
        style={{ marginTop: 20 }}
      >
        <Alert severity="success">
          <p className="pr-3">{location.state?.message}</p>
        </Alert>
      </Snackbar>
    </div>
  );
};

export default CodeShare;
