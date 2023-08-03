import React from "react";
import ContentCopyIcon from "@mui/icons-material/ContentCopy";
import { EMPTY_STRING_EQUIVALENT } from "@/contants";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import PopoverMoreIcon from "../PopoverMoreIcon";
import dockRightIcon from "../../assets/icons/right_dock.svg";
import dockBottomIcon from "../../assets/icons/bottom_dock.svg";
import { useStore } from "@/store/useStore";
import { handleRoomDataChangeFunction } from "@/utils/types";
import Tooltip from "@mui/material/Tooltip";

const RightDock = ({
  debouncedHandleRoomDataChange,
}: {
  debouncedHandleRoomDataChange?: handleRoomDataChangeFunction;
}) => {
  const {
    data: { drawerDock, input, output },
    actions: { setDrawerDock,  setInput },
  } = useStore();
  const toggleDrawerDock = () => {
    if (drawerDock === "RIGHT") setDrawerDock("BOTTOM");
    else setDrawerDock("RIGHT");
  };

  return (
    <div className="flex h-full w-full flex-col border-l border-[#525252] ">
      <div className="flex  h-1/2 flex-col">
        <div className="flex h-[50px] items-center justify-between bg-[#272727] pl-[10px] pr-4  text-[14px] text-white">
          <p>Input</p>
          <div className="flex items-center space-x-2">
            <Tooltip title="Copy Input" placement="bottom-end">
              <div
                className="flex cursor-pointer items-center hover:text-[#E21C3B]"
                onClick={async () => {
                  try {
                    await navigator.clipboard.writeText(input);
                  } catch (error) {
                    console.error("Failed to copy text:", error);
                  }
                }}
              >
                <ContentCopyIcon style={{ fontSize: 14 }} />
              </div>
            </Tooltip>
            <div className="cursor-pointer">
              <PopoverMoreIcon
                buttonElement={
                  <Tooltip
                    title="Change console placement"
                    placement="bottom-start"
                  >
                    <MoreVertIcon style={{ fontSize: 16 }} />
                  </Tooltip>
                }
                element={
                  <div className="flex flex-col space-y-2 rounded-none border border-[#424242] bg-[#272727] p-3 px-4 text-[10px] text-white shadow-xl">
                    <div
                      className="flex cursor-pointer items-center space-x-1 hover:text-[#cccccc]"
                      onClick={toggleDrawerDock}
                    >
                      <img src={dockBottomIcon} width={12} />
                      <p>DOCK TO BOTTOM</p>
                    </div>
                    <div
                      className="flex cursor-pointer items-center space-x-1 hover:text-[#cccccc]"
                      onClick={toggleDrawerDock}
                    >
                      <img src={dockRightIcon} width={12} />
                      <p>DOCK TO RIGHT</p>
                      <i className="fa-solid fa-check text-[10px] text-white"></i>
                    </div>
                  </div>
                }
              />
            </div>
          </div>
        </div>
        <div className="  h-full w-full  text-[14px] tracking-wide text-white">
          <textarea
            className="overflow-auto h-full w-full resize-none bg-[#202020] p-2 pl-[10px] text-[14px] outline-none"
            placeholder="Enter Input"
            spellCheck={false}
            value={input}
            onChange={(e) => {
              setInput(e.target.value);
              if (debouncedHandleRoomDataChange) {
                debouncedHandleRoomDataChange({
                  newInput:
                    e.target.value.length > 0
                      ? e.target.value
                      : EMPTY_STRING_EQUIVALENT,
                });
              }
            }}
          />
        </div>
      </div>
      <div className="flex h-1/2 flex-col bg-[#def14c]">
        <div className="flex h-[50px] items-center justify-between bg-[#272727] pl-[10px] pr-4 text-[14px] text-white">
          <p>Output</p>
          <Tooltip title="Copy Output" placement="bottom-end">
            <div
              className="cursor-pointer hover:text-[#E21C3B]"
              onClick={async () => {
                try {
                  await navigator.clipboard.writeText(output);
                } catch (error) {
                  console.error("Failed to copy text:", error);
                }
              }}
            >
              <ContentCopyIcon style={{ fontSize: 14 }} />
            </div>
          </Tooltip>
        </div>
        <div className="  h-full w-full text-[14px] tracking-wide text-white">
          <textarea
            className="h-full w-full resize-none bg-[#202020] p-2 pl-[10px] text-[14px] outline-none"
            readOnly={true}
            value={output}
          />
        </div>
      </div>
    </div>
  );
};

export default RightDock;
