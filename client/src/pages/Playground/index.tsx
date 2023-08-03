import CodeEditor from "@/components/CodeEditor/CodeEditor";
import IODrawer from "@/components/IODrawer";
import Navbar from "@/components/Navbar";
import SEO from "@/components/SEO";
import { useStore } from "@/store/useStore";
import { getDefaultCode } from "@/utils/defaultCodes";
import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";

const Playground = () => {
  const [code, setCode] = React.useState("");
  const { pathname } = useLocation();
  const path = pathname.split("/")[1];
  const {
    data: { language },
    actions: { spinUpServer },
  } = useStore();

  const handleSpinUpServer = async () => await spinUpServer();
  useEffect(() => {
    handleSpinUpServer();
  }, []);

  useEffect(() => {
    document.body.style.overflowY = "hidden";
    return () => {
      document.body.style.overflowY = "auto";
    };
  }, []);
  
  useEffect(() => {
    setCode(getDefaultCode(language));
  }, [language]);

  return (
    <div>
      <SEO options={{ title: "Playground - Codelive" }} />
      <Navbar code={code} />
      <CodeEditor
        onChange={(newValue) => {
          setCode(newValue);
        }}
        value={code}
      />
    </div>
  );
};

export default Playground;
