import React, { useContext } from 'react'
import AceEditor from "react-ace";
import useStyle from './editorStyles'
import "ace-builds/src-noconflict/mode-java";
import "ace-builds/src-noconflict/mode-c_cpp";
import "ace-builds/src-noconflict/mode-javascript";
import "ace-builds/src-noconflict/mode-python";
import "ace-builds/src-noconflict/mode-golang";
import "ace-builds/src-noconflict/mode-ruby";
import "ace-builds/src-noconflict/mode-scala";
import "ace-builds/src-noconflict/mode-csharp";
import "ace-builds/src-noconflict/mode-rust";
import "ace-builds/src-noconflict/mode-php";
import "ace-builds/src-noconflict/mode-dart";
import "ace-builds/src-noconflict/mode-kotlin";
import "ace-builds/src-noconflict/theme-one_dark";
import "ace-builds/src-noconflict/theme-monokai";
import "ace-builds/src-noconflict/theme-nord_dark";
import "ace-builds/src-noconflict/theme-clouds_midnight";
import "ace-builds/src-noconflict/theme-pastel_on_dark";
import "ace-builds/src-noconflict/theme-solarized_dark";
import "ace-builds/src-noconflict/theme-tomorrow_night";
import "ace-builds/src-noconflict/theme-terminal";
import "ace-builds/src-noconflict/ext-language_tools"
import { EditorContext } from '../../Contexts/EditorContext';
import * as ace from 'ace-builds/src-noconflict/ace';
ace.config.set('basePath', '/assets/ui/');
ace.config.set('modePath', '');
ace.config.set('themePath', '');


const Editor = () => {
  const classes = useStyle();
  const { code, language, theme, tabSize, handleCodeChange, fontSize } = useContext(EditorContext);
  const langForEditor = () => {
    if(language==='c' || language==='cpp')
      return('c_cpp');
    else if(language==='python3')
      return('python');
    else if(language==='nodejs')
      return('javascript');
    else if(language==='go')
      return('golang');
    return(language);
  }
  const editorLang = langForEditor();
  return (
    <div className={classes.editorClass}>
      <AceEditor
        value={code}
        mode={editorLang}
        theme={theme}
        onChange={handleCodeChange}
        name="UNIQUE_ID_OF_DIV"
        editorProps={{ $blockScrolling: true }}
        fontSize={parseInt(fontSize)}
        tabSize={tabSize}
        setOptions={{
          enableBasicAutocompletion: true,
          enableLiveAutocompletion: true,
          enableSnippets: true
        }}
        width={"100%"}
        style={{height: '100%'}}
      />
    </div>
  )
}

export default Editor