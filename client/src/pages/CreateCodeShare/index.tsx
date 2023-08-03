import CodeEditor from "@/components/CodeEditor/CodeEditor";
import Navbar from "@/components/Navbar";
import SEO from "@/components/SEO";
import { debug_mode } from "@/debug-controller";
import { useStore } from "@/store/useStore";
import { getDefaultCode } from "@/utils/defaultCodes";
import { Alert, Snackbar } from "@mui/material";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const CreateCodeShare = () => {
  const [code, setCode] = React.useState("");
  const [isCreatingRoom, setIsCreatingRoom] = useState(false);

  const navigate = useNavigate();
  const {
    data: { language },
    actions: { setLanguage, createCodeShareRoom },
  } = useStore();

  const createNewRoom = async () => {
    setIsCreatingRoom(true);
    setLanguage("text");
    setCode(getDefaultCode("text"));
    const response = await createCodeShareRoom({
      language: "text",
      code: "// Start Coding!\n\n\n",
      input: "",
      output: "",
    });
    if (response.success) {
      navigate(`/codeshare/${response.room._id}`, {
        state: { message: "New Codeshare Created!" },
      });
    }
    debug_mode && console.log({ createNewRoomRes: response });
    setIsCreatingRoom(false);
  };

  useEffect(() => {
    createNewRoom();
  }, []);
  useEffect(() => {
    document.body.style.overflowY = 'hidden';
    return () => {
      document.body.style.overflowY = 'auto';
    };
  }, []);

  return (
    <div>
      <SEO options={{ title: "Creating Codeshare..." }} />
      <Navbar code={code} />
      <CodeEditor
        onChange={(newValue) => {
          setCode(newValue);
        }}
        value={code}
        style={{ marginTop: 42 }}
        readOnly={true}
      />
      <Snackbar
        open={isCreatingRoom}
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
        style={{ marginTop: 20 }}
      >
        <Alert severity="info">
          <p className="pr-3">Creating New Codeshare</p>
        </Alert>
      </Snackbar>
    </div>
  );
};

export default CreateCodeShare;
