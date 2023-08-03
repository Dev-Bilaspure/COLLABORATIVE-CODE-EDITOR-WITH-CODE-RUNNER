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

const BottomDock = ({
  debouncedHandleRoomDataChange,
}: {
  debouncedHandleRoomDataChange?: handleRoomDataChangeFunction;
}) => {
  const {
    data: { drawerDock, input, output },
    actions: { setDrawerDock, setInput },
  } = useStore();

  const toggleDrawerDock = () => {
    if (drawerDock === "RIGHT") setDrawerDock("BOTTOM");
    else setDrawerDock("RIGHT");
  };

  return (
    <div className="w-ful flex h-full rounded-t-xl text-[#fff]">
      <div className="w-1/2">
        <div className="flex h-[40px] items-center justify-between border-t border-[#525252] bg-[#272727] px-4 text-[14px]">
          <p className="tracking-wide">Input</p>
          <Tooltip title="Copy Input" placement="bottom-end">
            <div
              className="cursor-pointer hover:text-[#E21C3B]"
              onClick={async () => {
                try {
                  await navigator.clipboard.writeText(input);
                } catch (error) {
                  console.error("Failed to copy text:", error);
                }
              }}
            >
              <ContentCopyIcon style={{ fontSize: 16 }} />
            </div>
          </Tooltip>
        </div>
        <div className="h-full w-full bg-[#202020] pb-[75px] pl-4 pr-0 pt-2 text-[14px] outline-none">
          <textarea
            className="h-full w-full resize-none bg-[#202020] text-[14px] tracking-wide outline-none"
            placeholder="Enter Input"
            value={input}
            spellCheck={false}
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
      <div className="w-1/2 border-l border-[#525252] bg-[#272727]">
        <div className="flex h-[40px] items-center justify-between border-t border-[#525252] bg-[#272727] px-4 text-[14px]">
          <p className=" tracking-wide">Output</p>

          <div className="flex items-center space-x-2">
            <Tooltip title="Copy Output" placement="bottom-start">
              <div
                className="flex cursor-pointer items-center hover:text-[#E21C3B]"
                onClick={async () => {
                  try {
                    await navigator.clipboard.writeText(output);
                  } catch (error) {
                    console.error("Failed to copy text:", error);
                  }
                }}
              >
                <ContentCopyIcon style={{ fontSize: 15 }} />
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
                      <i className="fa-solid fa-check text-[10px] text-white"></i>
                    </div>
                    <div
                      className="flex cursor-pointer items-center space-x-1 hover:text-[#cccccc]"
                      onClick={toggleDrawerDock}
                    >
                      <img src={dockRightIcon} width={12} />
                      <p>DOCK TO RIGHT</p>
                    </div>
                  </div>
                }
              />
            </div>
          </div>
        </div>
        <div className="h-full w-full bg-[#202020] pb-[75px] pl-4 pr-0 pt-2 text-[14px] outline-none">
          <textarea
            className="h-full w-full resize-none bg-[#202020] text-[14px] tracking-wide outline-none"
            readOnly={true}
            value={output}
          />
        </div>
      </div>
    </div>
  );
};

export default BottomDock;
