import React, { useEffect } from "react";
import { useStore } from "@/store/useStore";
import { handleRoomDataChangeFunction } from "@/utils/types";
import RightDock from "../IODrawer/RightDock";
import BottomDock from "../IODrawer/BottomDock";
import { useLocation } from "react-router-dom";
import { Editor } from "@monaco-editor/react";

interface CodeEditorProps {
  onChange: (newValue: string) => void;
  value: string;
  style?: React.CSSProperties;
  readOnly?: boolean;
  debouncedHandleRoomDataChange?: handleRoomDataChangeFunction;
}

const CodeEditor: React.FC<CodeEditorProps> = ({
  onChange,
  value,
  style,
  readOnly,
  debouncedHandleRoomDataChange,
}) => {
  const {
    data: { language, fontSize, tabSize, theme, drawerDock, isIODrawerOpen },
    actions: { setIODrawerOpen },
  } = useStore();

  const onClose = () => setIODrawerOpen(false);
  const onOpen = () => setIODrawerOpen(true);
  const toggleDrawer = () => {
    if (isIODrawerOpen) {
      onClose();
    } else {
      onOpen();
    }
  };
  const { pathname } = useLocation();
  const path = pathname.split("/")[1];
  useEffect(() => {
    const handleKeyDown = (event) => {
      if (event.ctrlKey && event.key === "`") {
        event.preventDefault();
        toggleDrawer();
      }
    };
    document.addEventListener("keydown", handleKeyDown);
    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [isIODrawerOpen]);

  useEffect(() => {
    const handleKeyDown = (event) => {
      if (event.key === "Escape") {
        event.preventDefault();
        onClose();
      }
    };
    if (isIODrawerOpen) {
      document.addEventListener("keydown", handleKeyDown);
    }
    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [isIODrawerOpen]);

  const langForEditor = () => {
    if (language === "c" || language === "cpp17") return "cpp";
    else if (language === "python3") return "python";
    else if (language === "nodejs") return "javascript";
    return language;
  };
  const editorLang = langForEditor();
  return (
    <div className="flex h-screen">
      <div
        className={`h-full ${
          isIODrawerOpen && drawerDock === "RIGHT" ? "w-3/4 md:w-2/3" : "w-full"
        } pt-[42px]`}
      >
        <Editor
          height="100%"
          width="100%"
          theme={theme}
          language={editorLang}
          value={value}
          // @ts-ignore
          onChange={onChange}
          options={{
            fontSize: parseInt(fontSize.toString()),
            tabSize: tabSize,
          }}
          readOnly={readOnly}
          style={style}
        />
      </div>
      {isIODrawerOpen &&
        (drawerDock === "RIGHT" ? (
          <div className="h-full w-1/4 pt-[42px] md:w-1/3">
            <RightDock
              debouncedHandleRoomDataChange={debouncedHandleRoomDataChange}
            />
          </div>
        ) : (
          <div
            className={`fixed bottom-0 h-[270px] w-full md:h-[240px] sm:h-[130px]`}
          >
            <BottomDock
              debouncedHandleRoomDataChange={debouncedHandleRoomDataChange}
            />
          </div>
        ))}
    </div>
  );
};

export default CodeEditor;
