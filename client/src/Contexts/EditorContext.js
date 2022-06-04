import React, { createContext, useState } from 'react';
import { getDefaultCode } from '../utils/defaulltCode';


export const EditorContext = createContext();

const EditorContextProvider = (props) => {
  const defaultCppCode = getDefaultCode('cpp');
  const [code, setCode] = useState(defaultCppCode);
  const [language, setLanguage] = useState('cpp');
  const [theme, setTheme] = useState('clouds_midnight');
  const [tabSize, setTabSize] = useState(4);
  const [fontSize, setFontSize] = useState(15);
  const [inputs, setInputs] = useState('');
  const [output, setOutput] = useState('');
  const [fileName, setFileName] = useState('code');
  const [isDialogBoxVisible, setIsDialogBoxVisible] = useState(false);

  
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
