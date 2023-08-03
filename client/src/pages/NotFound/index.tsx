import { useStore } from "@/store/useStore";
import CodeIcon from "@mui/icons-material/Code";
import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import GitHubIcon from "@mui/icons-material/GitHub";
import SEO from "@/components/SEO";

const NotFound = () => {
  const {
    actions: { spinUpServer },
  } = useStore();
  const handleSpinUpServer = async () => await spinUpServer();
  useEffect(() => {
    handleSpinUpServer();
  }, []);
  return (
    <div className="h-screen w-full">
      <SEO options={{ title: "404: Page Not Found" }} />
      <div className=" flex h-fit w-full justify-between space-x-1 rounded-sm bg-[#30353e] px-7 py-2">
        <Link to="/">
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
        <p className="font-opensans text-[35px]">404: Page Not Found</p>
        <div className="mt-5 flex justify-center space-x-8 font-opensans text-[16px]">
          Double check the url or head back to{" "}
          <Link
            to="/"
            className="ml-2 text-[#4D76BA] underline hover:no-underline"
          >
            Codelive Home
          </Link>
        </div>
      </div>
    </div>
  );
};

export default NotFound;
