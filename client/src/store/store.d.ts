interface State {
  data: {
    authenticatedUser: any;
    language: string;
    theme: string;
    tabSize: number;
    fontSize: number;
    fileName: string;
    input: string;
    output: string;
    isIODrawerOpen: boolean;
    drawerDock: 'RIGHT' | 'BOTTOM';
  };
  actions: {
    setLanguage: (language: string) => void;
    setTheme: (theme: string) => void;
    setTabSize: (tabSize: number) => void;
    setFontSize: (fontSize: number) => void;
    setFileName: (fileName: string) => void;
    setInput: (input: string) => void;
    setOutput: (output: string) => void;
    setIODrawerOpen: (isIODrawerOpen: boolean) => void;
    setDrawerDock: (value: 'RIGHT' | 'BOTTOM') => void;
    resetNavbar: () => void;
    createCodeShareRoom: ({
      code,
      language,
      input,
      output,
    }: {
      code: string;
      language: string;
      input: string;
      output: string;
    }) => Promise<any>;
    executeCode: (code: string) => Promise<any>;
    spinUpServer: () => Promise<any>;
  };
}
