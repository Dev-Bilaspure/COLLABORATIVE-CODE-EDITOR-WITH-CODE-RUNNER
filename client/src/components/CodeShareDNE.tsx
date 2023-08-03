import { useStore } from "@/store/useStore";
import CodeIcon from "@mui/icons-material/Code";
import React, { useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import GitHubIcon from "@mui/icons-material/GitHub";
import SEO from "./SEO";

const CodeShareDNE = () => {
  const {
    actions: { spinUpServer },
  } = useStore();
  const handleSpinUpServer = async () => await spinUpServer();
  useEffect(() => {
    handleSpinUpServer();
  }, []);
  const { roomId } = useParams();
  return (
    <div
      className="h-screen w-full"
      style={{ background: "linear-gradient(to bottom, #30353e 27%, #4D76BA)" }}
    >
      <SEO options={{ title: '404: Codeshare Not Found' }} />
      <div className=" flex h-fit w-full justify-between space-x-1 rounded-sm px-7 py-2">
        <Link to={"/"}>
          <div className="flex items-center space-x-1">
            <CodeIcon
              style={{
                color: "white",
                fontSize: 27,
                display: "flex",
                alignItems: "center",
              }}
            />
            <p className="pr-1 font-roboto text-[22px] tracking-wide text-white">
              codelive
            </p>
          </div>
        </Link>
        <div className="flex items-center space-x-7">
          <Link to="https://www.linkedin.com/in/dev-bilaspure/" target="_blank">
            <div className="flex h-fit cursor-pointer items-center space-x-1 rounded-sm  py-[2px] px-1">
              <LinkedInIcon style={{ color: "white", fontSize: 20 }} />
              <p className="pr-1 font-opensans text-[15px] text-white md:hidden">
                Linkedin
              </p>
            </div>
          </Link>
          <Link to="https://github.com/Dev-Bilaspure" target="_blank">
            <div
              onClick={() => {
                window.open("https://github.com/Dev-Bilaspure", "_blank");
              }}
              className="flex h-fit cursor-pointer items-center space-x-1 rounded-sm py-[2px] px-1"
            >
              <GitHubIcon style={{ color: "white", fontSize: 20 }} />
              <p className="pr-1 font-opensans text-[15px] text-white md:hidden">
                Github
              </p>
            </div>
          </Link>
        </div>
      </div>

      <div className="mt-[80px] text-center">
        <p className="font-opensans text-[38px] text-white">
          404: Codeshare Not Found
        </p>
        <p className="mt-5 font-opensans text-[20px] text-[#d9dadb]">
          {`Oops! No Codeshare found with ID "${roomId}". Please check the Codeshare ID or create a new one.`}
        </p>
        <div className="mt-[50px] flex justify-center space-x-8">
          <Link to="/playground">
            <button className="rounded-lg bg-[#EC3360] px-5 py-3 text-[13px] text-white hover:bg-[#de2a56]">
              Run Code Now
            </button>
          </Link>
          <Link to="/codeshare">
            <button className="rounded-lg border border-white bg-[#EC3360] px-5 py-3 text-[13px] text-white hover:bg-[#de2a56]">
              Share Code Now
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default CodeShareDNE;
