import { useStore } from "@/store/useStore";
import CodeIcon from "@mui/icons-material/Code";
import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import GitHubIcon from "@mui/icons-material/GitHub";
import SEO from "@/components/SEO";

const Home = () => {
  const {
    actions: { spinUpServer },
  } = useStore();
  const handleSpinUpServer = async () => await spinUpServer();
  useEffect(() => {
    handleSpinUpServer();
  }, []);

  return (
    <div
      className="min-h-[100vh] w-full pb-20"
      style={{ background: "linear-gradient(to bottom, #30353e 27%, #4D76BA)" }}
    >
      <SEO options={{ title: "Codelive" }} />
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
            <div className="flex h-fit cursor-pointer items-center space-x-1 rounded-sm  px-1 py-[2px]">
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
              className="flex h-fit cursor-pointer items-center space-x-1 rounded-sm px-1 py-[2px]"
            >
              <GitHubIcon style={{ color: "white", fontSize: 20 }} />
              <p className="pr-1 font-opensans text-[15px] text-white md:hidden">
                Github
              </p>
            </div>
          </Link>
        </div>
      </div>

      <div className="mt-[80px] px-5 text-center">
        <p className="font-opensans text-[38px] text-white sm:text-[25px]">
          Run and Share Code in Real-time with Developers
        </p>
        <p className="mt-5 font-opensans text-[12px] text-[20px] text-[#d9dadb]">
          An online code editor for interviews, troubleshooting, teaching & more
        </p>
        <div className="mt-[50px] flex justify-center space-x-8">
          <Link to="/playground">
            <button className="rounded-lg bg-[#EC3360] px-5 py-3  text-[13px] text-white hover:bg-[#de2a56] sm:px-3 sm:py-3 sm:text-[11px]">
              Run Code Now
            </button>
          </Link>
          <Link to="/codeshare">
            <button className="rounded-lg bg-[#EC3360] px-5 py-3 text-[13px] text-white hover:bg-[#de2a56] sm:px-3 sm:py-3 sm:text-[11px]">
              Share Code Now
            </button>
          </Link>
        </div>
      </div>
      <div className="mt-[130px] flex justify-center ">
        <div className="w-3/4 text-white">
          <p className="font-opensans text-[28px] sm:text-[24px]">Features:</p>
          <div className="mt-5 flex font-opensans text-[16px] sm:mt-3 sm:text-[14px]">
            <ul className="flex flex-col space-y-5 sm:space-y-3">
              <li className="leading-7 tracking-wide">
                Unleash Powerfull Code Editor: Code in C++, Java, JavaScript,
                Python, and 9+ more languages, with input/output console, VS
                Code themes, and downloadable code files for an immersive and
                personalized coding experience!
              </li>
              <li className="leading-7 tracking-wide">
                Unlock Collaborative Coding: Seamlessly Share Code, Inputs, and
                Outputs in Real Time with Multiple Peers Simultaneously!
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
