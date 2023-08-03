import { Alert, Button, Snackbar } from "@mui/material";
import PlayArrowIcon from "@mui/icons-material/PlayArrow";
import React, { useState } from "react";
import { useStore } from "@/store/useStore";
import {
  codeEditorFontSizes,
  codeEditorLanguages,
  codeEditorThemes,
} from "@/utils/editorConstants";
import FileDownloadIcon from "@mui/icons-material/FileDownload";
import FileDownloadDialogBox from "./FileDownloadDialog";
import { handleRoomDataChangeFunction } from "@/utils/types";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import GitHubIcon from "@mui/icons-material/GitHub";
import CodeIcon from "@mui/icons-material/Code";
import { Link } from "react-router-dom";
import KeyboardIcon from "@mui/icons-material/Keyboard";
import Tooltip from "@mui/material/Tooltip";
import SettingsIcon from "@mui/icons-material/Settings";
import ArrowRightIcon from "@mui/icons-material/ArrowRight";
import ArrowLeftIcon from "@mui/icons-material/ArrowLeft";

const Navbar = ({
  code,
  handleRoomDataChange,
}: {
  code: string;
  handleRoomDataChange?: handleRoomDataChangeFunction;
}) => {
  const [isDownloadCodeDialogOpen, setIsDownloadCodeDialogOpen] =
    useState(false);
  const [isRunning, setIsRunning] = useState(false);
  const [codeRunStatus, setCodeRunStatus] = useState("");
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);
  const {
    data: {
      language,
      fontSize,
      theme,
      fileName,
      input,
      output,
      isIODrawerOpen,
      tabSize,
    },
    actions: {
      setLanguage,
      setFontSize,
      setTheme,
      setFileName,
      executeCode,
      setOutput,
      setIODrawerOpen,
      setTabSize,
    },
  } = useStore();

  const toggleDrawer = () => {
    if (isIODrawerOpen) setIODrawerOpen(false);
    else setIODrawerOpen(true);
  };
  return (
    <div
      style={{
        position: "fixed",
        top: 0,
        zIndex: 100,
        width: "100%",
        borderBottom: "1px solid #323232",
      }}
    >
      <FileDownloadDialogBox
        code={code}
        onClose={() => {
          if (fileName === "") {
            setFileName("code");
          }
          setIsDownloadCodeDialogOpen(false);
        }}
        open={isDownloadCodeDialogOpen}
      />
      <div
        className="flex items-center justify-between px-[15px]  tracking-wide"
        style={{ background: "#262626", height: 42 }}
      >
        <div className="flex w-full space-x-5 ">
          <Button
            color="inherit"
            style={{
              width: "fit-content",
              background: "rgb(226,28,59)",
              height: 36,
              color: "#ffffff",
              borderRadius: 25,
              paddingRight: 13,
              paddingLeft: 5,
              marginTop: 2,
              opacity: isRunning || language === "text" ? 0.5 : 1,
              cursor: isRunning || language === "text" ? "default" : "pointer",
            }}
            onClick={async () => {
              if (isRunning || language === "text") return;
              setIsRunning(true);
              const response = await executeCode(code);
              if (response.success) {
                setCodeRunStatus("success");
                setOutput(response.data.output);
                setIODrawerOpen(true);
                if (handleRoomDataChange) {
                  handleRoomDataChange({ newOutput: response.data.output });
                }
              } else {
                setCodeRunStatus("error");
              }
              setIsRunning(false);
            }}
          >
            <PlayArrowIcon style={{ color: "#fff", height: 18 }} />
            <p className=" text-[12px] font-bold text-white">
              {isRunning ? "Running" : "Run"}
            </p>
          </Button>
          <div>
            <select
              name="plan"
              id="plan"
              className="h-[40px] w-[75px] cursor-pointer border-none bg-[#262626] text-[12px] text-white outline-none"
              value={language}
              onChange={(e) => {
                setLanguage(e.target.value);
                if (handleRoomDataChange) {
                  handleRoomDataChange({ newLanguage: e.target.value });
                }
              }}
            >
              {codeEditorLanguages.map((lang) => (
                <option value={lang.value} selected={lang.value === "cpp17"}>
                  <p>{lang.language}</p>
                </option>
              ))}
            </select>
          </div>
          <div className="flex items-center">
            <div
              className={`flex items-center ${
                isSettingsOpen
                  ? "rotate-45 duration-300"
                  : "-rotate-45 duration-300"
              }`}
              onClick={() => setIsSettingsOpen(!isSettingsOpen)}
            >
              <SettingsIcon
                style={{ color: "#fff", fontSize: 21, cursor: "pointer" }}
              />
            </div>
            {!isSettingsOpen ? (
              <ArrowRightIcon
                style={{ color: "#fff", fontSize: 21, cursor: "pointer" }}
              />
            ) : (
              <ArrowLeftIcon
                style={{ color: "#fff", fontSize: 21, cursor: "pointer" }}
              />
            )}
          </div>
          {isSettingsOpen ? (
            <>
              <div className="flex items-center space-x-1">
                <p className="text-[11px] text-white">FONT SIZE</p>
                <select
                  name="plan"
                  id="plan"
                  className="h-[40px] w-[50px] cursor-pointer border-none bg-[#262626] text-[12px] text-white outline-none "
                  value={fontSize}
                  onChange={(e) => setFontSize(parseInt(e.target.value))}
                >
                  {codeEditorFontSizes.map((fntSz) => (
                    <option value={fntSz} selected={fntSz === 15}>
                      <p>{fntSz}</p>
                    </option>
                  ))}
                </select>
              </div>
              <div className="flex items-center space-x-1">
                <p className="text-[11px] text-white">TAB SIZE</p>
                <select
                  name="plan"
                  id="plan"
                  className="h-[40px] w-[40px] cursor-pointer border-none bg-[#262626] text-[12px] text-white outline-none "
                  value={tabSize}
                  onChange={(e) => setTabSize(parseInt(e.target.value))}
                >
                  {[2, 4, 8].map((tbSz) => (
                    <option value={tbSz} selected={tbSz === 2}>
                      <p>{tbSz}</p>
                    </option>
                  ))}
                </select>
              </div>
              <div className="flex items-center space-x-1 ">
                <p className="text-[11px] text-white">THEME</p>
                <select
                  name="plan"
                  id="plan"
                  className="h-[40px] w-[140px] cursor-pointer border-none bg-[#262626] text-[12px] text-white outline-none"
                  value={theme}
                  onChange={(e) => setTheme(e.target.value)}
                >
                  {codeEditorThemes.map((thm) => (
                    <option
                      value={thm.value}
                      selected={thm.value === "tomorrow_night"}
                    >
                      <p>{thm.theme}</p>
                    </option>
                  ))}
                </select>
              </div>
            </>
          ) : (
            <></>
          )}
          <div className="flex items-center hover:text-[#d41937]">
            <Tooltip title={` Use "Ctrl + Backtick" to Toggle Console`}>
              <Button
                variant="text"
                style={{
                  background: "rgb(38,39,38)",
                  textTransform: "none",
                  height: 20,
                  padding: 0,
                }}
                onClick={toggleDrawer}
              >
                <KeyboardIcon style={{ color: "#fff", fontSize: 14 }} />
                <p className="ml-1  text-[11px] text-[#fff] ">CONSOLE</p>
              </Button>
            </Tooltip>
          </div>
          <div className="flex items-center ">
            <Button
              variant="text"
              style={{
                background: "rgb(38,39,38)",
                textTransform: "none",
                height: 20,
                padding: 0,
              }}
              onClick={() => setIsDownloadCodeDialogOpen(true)}
            >
              <p className="mr-1  text-[11px] text-[#fff]">DOWNLOAD</p>
              <FileDownloadIcon style={{ color: "#fff", fontSize: 14 }} />
            </Button>
          </div>
          <div className="flex items-center space-x-[6px]">
            <p className="text-[11px] text-[#fff]">FILE NAME</p>
            <div className="flex rounded-sm border-b-[1px] border-[#fff]">
              <input
                type="text"
                className="w-[100px] rounded-sm bg-[#313133] px-1 py-[2px] text-[12px] text-[#fff] outline-none"
                value={fileName}
                onChange={(e) => setFileName(e.target.value)}
                spellCheck={false}
              />
            </div>
          </div>
        </div>
        <div className="flex items-center space-x-3 sm:hidden">
          <div
            onClick={() => {
              window.open(
                "https://www.linkedin.com/in/dev-bilaspure/",
                "_blank"
              );
            }}
            className="flex h-[25px] cursor-pointer items-center space-x-1 rounded-sm  px-1 py-[2px] hover:bg-[#d41937]"
          >
            <LinkedInIcon style={{ color: "white", fontSize: 16 }} />
            <p className="pr-1 text-[13px] text-white md:hidden">Linkedin</p>
          </div>
          <div
            onClick={() => {
              window.open("https://github.com/Dev-Bilaspure", "_blank");
            }}
            className="flex h-[25px] cursor-pointer items-center space-x-1 rounded-sm  px-1 py-[2px] hover:bg-[#d41937]"
          >
            <GitHubIcon style={{ color: "white", fontSize: 16 }} />
            <p className="pr-1 text-[13px] text-white md:hidden">Github</p>
          </div>
          <Link to="/">
            <div className=" flex h-fit items-center space-x-1 rounded-sm px-2 py-[1px]">
              <CodeIcon style={{ color: "white", fontSize: 23 }} />
              <p className="pr-1 font-roboto text-[19px] text-white md:hidden">
                codelive
              </p>
            </div>
          </Link>
        </div>
      </div>
      <Snackbar
        open={codeRunStatus === "success"}
        anchorOrigin={{ vertical: "top", horizontal: "right" }}
        autoHideDuration={3000}
        onClose={() => setCodeRunStatus("")}
      >
        <Alert severity="success">
          <p>Code complied successfully!</p>
        </Alert>
      </Snackbar>
      <Snackbar
        open={codeRunStatus === "error"}
        anchorOrigin={{ vertical: "top", horizontal: "right" }}
        autoHideDuration={3000}
        onClose={() => setCodeRunStatus("")}
      >
        <Alert severity="error">
          <div className="pl-3">
            <p>There was some error while running the code.</p>
            <p>Please try again.</p>
          </div>
        </Alert>
      </Snackbar>
    </div>
  );
};

export default Navbar;
