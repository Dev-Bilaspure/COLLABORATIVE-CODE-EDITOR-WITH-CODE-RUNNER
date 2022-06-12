import React, { createContext, useEffect, useState } from 'react';
import { getDefaultCode } from '../utils/defaulltCode';


export const EditorContext = createContext();

const EditorContextProvider = (props) => {

  const defaultCppCode = getDefaultCode('cpp');
  const [code, setCode] = useState(sessionStorage.getItem('ls_code') ? sessionStorage.getItem('ls_code') : defaultCppCode);
  const [language, setLanguage] = useState(sessionStorage.getItem('ls_language') ? sessionStorage.getItem('ls_language') : 'cpp');
  const [theme, setTheme] = useState(sessionStorage.getItem('ls_theme') ? sessionStorage.getItem('ls_theme') : 'clouds_midnight');
  const [tabSize, setTabSize] = useState(sessionStorage.getItem('ls_tabSize') ? parseInt(sessionStorage.getItem('ls_tabSize')) : 4);
  const [fontSize, setFontSize] = useState(sessionStorage.getItem('ls_fontSize') ? parseInt(sessionStorage.getItem('ls_fontSize')) : 15);
  const [inputs, setInputs] = useState(sessionStorage.getItem('ls_inputs') ? sessionStorage.getItem('ls_inputs') : '');
  const [output, setOutput] = useState(sessionStorage.getItem('ls_output') ? sessionStorage.getItem('ls_output') : '');
  const [fileName, setFileName] = useState(sessionStorage.getItem('ls_fileName') ? sessionStorage.getItem('ls_fileName') : 'code');
  const [isDialogBoxVisible, setIsDialogBoxVisible] = useState(false);

  useEffect(() => {
    sessionStorage.setItem('ls_code', code);
    sessionStorage.setItem('ls_language', language);
    sessionStorage.setItem('ls_theme', theme);
    sessionStorage.setItem('ls_tabSize', tabSize);
    sessionStorage.setItem('ls_fontSize', fontSize);
    sessionStorage.setItem('ls_inputs', inputs);
    sessionStorage.setItem('ls_output', output);
    sessionStorage.setItem('ls_fileName', fileName);
    
  }, [code, language, theme, tabSize, fontSize, inputs, output, fileName])

  const handleToggleDialogBox = () => {
    if(fileName==='')
      handleFileNameChange('code');
    setIsDialogBoxVisible(!isDialogBoxVisible);
  }

  const handleFileNameChange = (newFileName) => {
    setFileName(newFileName);
  }
	const handleCodeChange = (newValue) => {
		setCode(newValue);
		// console.log(newValue)
	}

	const handleLanguageChange  = (lang) => {
		setLanguage(lang);
		// console.log(lang);
	}

	const handleThemeChange = (theme) => {
		setTheme(theme);
	}

	const handleTabSizeChange = (ts) => {
		setTabSize(ts);
	}

	const handleFontSizeChange = (fs) => {
		setFontSize(fs);
	}
 
  const handleInputsChange = (inp) => {
    setInputs(inp);
    // console.log(inp);
  }

  const handleOutputChange = (otpt) => {
    setOutput(otpt);
    // console.log(otpt);
  }
  return (
    <EditorContext.Provider value={{
      code,
      language,
      theme,
      tabSize,
      fontSize,
      inputs,
      output,
      fileName,
      isDialogBoxVisible,
      handleCodeChange,
      handleLanguageChange,
      handleThemeChange,
      handleTabSizeChange,
      handleFontSizeChange,
      handleInputsChange,
      handleOutputChange,
      handleFileNameChange,
      handleToggleDialogBox
		}}>
      {props.children}
    </EditorContext.Provider>
  );
}
 
export default EditorContextProvider;
