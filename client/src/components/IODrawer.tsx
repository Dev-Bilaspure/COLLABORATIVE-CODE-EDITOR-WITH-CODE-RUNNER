import { useStore } from "@/store/useStore";
import React, { useEffect } from "react";
import { handleRoomDataChangeFunction } from "@/utils/types";
import RightDock from "./IODrawer/RightDock";
import BottomDock from "./IODrawer/BottomDock";

const IODrawer = ({
  debouncedHandleRoomDataChange,
}: {
  debouncedHandleRoomDataChange?: handleRoomDataChangeFunction;
}) => {
  const {
    data: { isIODrawerOpen, drawerDock },
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

  return drawerDock === "BOTTOM" ? (
    <BottomDock debouncedHandleRoomDataChange={debouncedHandleRoomDataChange} />
  ) : (
    <RightDock debouncedHandleRoomDataChange={debouncedHandleRoomDataChange} />
  );
};

export default IODrawer;
