import React, { useContext, useState } from "react";
import Dialog from "@mui/material/Dialog";
import fileDownload from "js-file-download";
import { getFileExtension } from "@/utils/helperMethods";
import { useStore } from "@/store/useStore";
import { Button, Typography } from "@mui/material";

const FileDownloadDialogBox = ({ onClose, open, code  }) => {
  const {
    data: { fileName, language },
    actions: { setFileName },
  } = useStore();

  const handleDownloadFile = () => {
    fileDownload(
      code,
      `${fileName === "" ? "code" : fileName}${getFileExtension(language)}`
    );
    onClose();
  };
  return (
    <div style={{ background: "rgb(33,32,33)" }}>
      <Dialog onClose={onClose} open={open}>
        <div style={{ width: 500 }}>
          <div className="border-b-[2px] border-[#1c1c1c] bg-[#212021] py-[10px] text-center">
            <p className="text-[21px] text-[#fff]">CONFIRM FILE NAME</p>
          </div>
          <div className="flex items-center justify-center bg-[#1e1f1f] py-[50px] text-center">
            <p className="mr-[10px] text-[15px] text-[#fff]">FILE NAME: </p>
            <div
              className="border-b-[1px] border-[#fff] px-[8px] pb-[4px]"
            >
              <input
                type="text"
                className="font-opensans tracking-wide bg-[#1e1f1f] text-[14px] text-[#fff] outline-none "
                value={fileName}
                onChange={(e) => setFileName(e.target.value)}
              />
            </div>
          </div>
          <div
            style={{
              background: "rgb(33,32,33)",
              paddingTop: 10,
              paddingBottom: 10,
              borderTop: "2px solid rgb(28, 28, 28)",
              display: "flex",
              alignItems: "right",
              justifyContent: "right",
              paddingRight: 10,
            }}
            className="items-right flex justify-start bg-[#1c1c1c] py-[10px]"
          >
            <Button
              variant="contained"
              style={{ background: "rgb(221,53,68)", color: "#fff" }}
              onClick={handleDownloadFile}
            >
              <Typography>DOWNLOAD</Typography>
            </Button>
          </div>
        </div>
      </Dialog>
    </div>
  );
};

export default FileDownloadDialogBox;
