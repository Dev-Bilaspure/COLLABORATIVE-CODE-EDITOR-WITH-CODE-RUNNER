import { create } from "zustand";
import { immer } from "zustand/middleware/immer";
import axios from "axios";
import { debug_mode } from "@/debug-controller";
import { SERVER_ORIGIN } from "@/contants";

const ORIGIN = "http://localhost:8000";
export const useStore = create<State, [["zustand/immer", never]]>(
  immer((set, get) => ({
    data: {
      authenticatedUser: null,
      language: "cpp17",
      theme: "vs-dark",
      tabSize: 2,
      fontSize: 15,
      fileName: "code",
      input: "",
      output: "",
      isIODrawerOpen: !false,
      drawerDock: "RIGHT",
    },
    actions: {
      setLanguage: (language: string) => {
        set((state) => {
          state.data.language = language;
        });
      },
      setTheme: (theme: string) => {
        set((state) => {
          state.data.theme = theme;
        });
      },
      setTabSize: (tabSize: number) => {
        set((state) => {
          state.data.tabSize = tabSize;
        });
      },
      setFontSize: (fontSize: number) => {
        set((state) => {
          state.data.fontSize = fontSize;
        });
      },
      setFileName: (fileName: string) => {
        set((state) => {
          state.data.fileName = fileName;
        });
      },
      setInput: (input: string) => {
        set((state) => {
          state.data.input = input;
        });
      },
      setOutput: (output: string) => {
        set((state) => {
          state.data.output = output;
        });
      },
      setIODrawerOpen: (isIODrawerOpen: boolean) => {
        set((state) => {
          state.data.isIODrawerOpen = isIODrawerOpen;
        });
      },
      setDrawerDock: (value) => {
        set((state) => {
          state.data.drawerDock = value;
        });
      },
      resetNavbar: () => {
        set((state) => {
          state.data.language = "cpp17";
          state.data.theme = "clouds_midnight";
          state.data.tabSize = 2;
          state.data.fontSize = 15;
          state.data.fileName = "code";
          state.data.input = "";
          state.data.output = "";
        });
      },
      createCodeShareRoom: async (roomInfo) => {
        try {
          const response = await axios.post(
            `${SERVER_ORIGIN}/api/codeshareroom`,
            roomInfo
          );
          return response.data;
        } catch (error: any) {
          return error.response.data;
        }
      },
      executeCode: async (code) => {
        try {
          const response = await axios.post(
            `${SERVER_ORIGIN}/api/execute-code`,
            {
              code,
              language: get().data.language,
              input: get().data.input,
            }
          );
          return response.data;
        } catch (error: any) {
          return error.response.data;
        }
      },
      spinUpServer: async () => {
        try {
          const response = await axios.get(`${SERVER_ORIGIN}/api/testing`);
          return response.data;
        } catch (error: any) {
          return error.response.data;
        }
      },
    },
  }))
);
