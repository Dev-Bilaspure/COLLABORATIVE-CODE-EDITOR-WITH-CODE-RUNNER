import React, { forwardRef, useContext, useState } from 'react'
import { Grid, Typography, Button } from '@material-ui/core';
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import KeyboardIcon from '@mui/icons-material/Keyboard';
import { EditorContext } from '../../Contexts/EditorContext';
import { getDefaultCode } from '../../utils/defaulltCode';
import useStyle from './controlBarStyle';
import CodeIcon from '@mui/icons-material/Code';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import GitHubIcon from '@mui/icons-material/GitHub';
import axios from 'axios';
import { Snackbar } from '@mui/material';
import MuiAlert from '@mui/material/Alert';

const ControlBar = ({handleInputIconClick}) => {
  const classes = useStyle();
  const fontSizeArray = [4, 6, 8, 10, 12, 14, 18, 20, 22, 24, 26, 28, 30, 32, 34, 36, 38, 40, 42, 44, 46, 48, 50, 52, 54, 56, 58, 60, 62, 64];
  const {code, language, inputs, handleOutputChange, handleFontSizeChange, handleTabSizeChange, handleThemeChange, handleLanguageChange, handleCodeChange} = useContext(EditorContext);
  
  const handleLang = (lng) => {
    handleCodeChange(getDefaultCode(lng));
    handleLanguageChange(lng);
  }

  const [showSystemErrorSnakBar, setShowSystemErrorSnakBar] = useState(false);
  const [showCompileErrorSnakBar, setShowCompileErrorSnakBar] = useState(false);
  const [showSuccessSnakBar, setShowSuccessSnakBar] = useState(false);
  const handleOnCloseSnakBar = () => {
    setShowCompileErrorSnakBar(false);
    setShowSuccessSnakBar(false);
    setShowSystemErrorSnakBar(false);
  }

  const isCodeEmpty = () => {
    const tempCode = code;
    if(tempCode.replaceAll('\n', '').replaceAll(' ', '').length===0)
      return(true);
    return(false);
  }

  const [isFetching, setIsFetching] = useState(false);

  const handleRunClick = async() => {
    if(!isFetching) {
      // console.log({ code, language, inputs});
      setIsFetching(true);

      if(isCodeEmpty()) {
        setIsFetching(false);
        setShowSystemErrorSnakBar(true);
        return;
      }

      try {
        const response = await axios.post(
          `http://localhost:5000/api/complierun`,
          { code, language, inputs}
        ).then(res => {
          // console.log(res.data);
          if(res.data.memory===null || res.data.output.includes('jdoodle'))
            setShowCompileErrorSnakBar(true);
          else
            setShowSuccessSnakBar(true);
          handleOutputChange(res.data.output.replaceAll('jdoodle', 'untitled'));
          setIsFetching(false);
        }).catch(err => {
          console.log(err);
          setShowSystemErrorSnakBar(true);
          setIsFetching(false);
        })
      } catch(error) {
        console.log(error);
        setShowSystemErrorSnakBar(true);
        setIsFetching(false);
      }
    }
    else {
      console.log('Already executing a query, please wait!!');
    }
  }
  return (
    <div style={{ position: 'fixed', top: 0, zIndex: 100, width: '100%'}}>
      <Snackbar open={showSuccessSnakBar} autoHideDuration={5000} onClose={handleOnCloseSnakBar}>
        <Alert onClose={handleOnCloseSnakBar} severity="success" sx={{ width: '100%' }} >
          Code Complied Successfully.
        </Alert>
      </Snackbar>
      <Snackbar open={showSystemErrorSnakBar} autoHideDuration={5000} onClose={handleOnCloseSnakBar}>
        <Alert onClose={handleOnCloseSnakBar} severity="error" sx={{ width: '100%' }} >
          There was some error while running the code,<br />
          please try again.
        </Alert>
      </Snackbar>
      <Snackbar open={showCompileErrorSnakBar} autoHideDuration={5000} onClose={handleOnCloseSnakBar}>
        <Alert onClose={handleOnCloseSnakBar} severity="error" sx={{ width: '100%' }} >
          Compilation or Runtime Error.
        </Alert>
      </Snackbar>
      <div style={{background: 'rgb(33,33,32)', height: 40}}>
        <Grid container>
          <Grid item>
            <Button
              variant="contained"
              className={classes.runBtn}
              onClick={handleRunClick}
              style={{background: isFetching ? 'rgb(151, 19, 39)' : 'rgb(226,28,59)'}}
            >
              <PlayArrowIcon style={{color: '#fff', height: 23}}/>
              <Typography style={{fontSize: 13, fontWeight: 'bold'}}>
                {!isFetching ? ' Run' : 'Running'}
              </Typography>
            </Button>
          </Grid>
          <Grid item>
            <div style={{marginLeft: 10}}>
              <select name="plan" id="plan" className={classes.selectTag} onChange={(e) => {handleLang(e.target.value)}}>
                <option value="cpp" selected>C++</option>
                <option value="c" >C</option>
                <option value="python3">Python 3</option>
                <option value="java" >Java</option>
                <option value="nodejs">Node JS</option>
                <option value="kotlin" >Kotlin</option>
                <option value="csharp">C#</option>
                <option value="go">GO lang</option>
                <option value="rust">Rust</option>
                <option value="ruby">Ruby</option>
                <option value="scala">Scala</option>
                <option value="dart">Dart</option>
                <option value="php" >PHP</option>
              </select>
            </div>
          </Grid>
          <Grid item>
            <div className={classes.inputsKeyboard} onClick={handleInputIconClick}>
              <Typography style={{fontSize: 12, color: '#fff', paddingTop: 2}}>INPUTS </Typography><KeyboardIcon style={{color: '#fff', height: 22, marginLeft: 5}}/>
            </div>
          </Grid>
          <Grid item>
            <div style={{marginLeft: 25, display: 'flex'}}>
              <Typography style={{fontSize: 12, color: '#fff', paddingTop: 2, marginTop: 9, marginRight: 5}}>FONT SIZE </Typography>
              <select className={classes.selectTagForFontSize} onChange={(e) => {handleFontSizeChange(e.target.value)}}>
                <option value="16" selected >16</option>
                {
                  fontSizeArray.map(ele => (
                    <option value={ele} key={ele}>{ele}</option>
                  ))
                }
              </select>
            </div>
          </Grid>
          <Grid item>
            <div style={{marginLeft: 25, display: 'flex'}}>
              <Typography style={{fontSize: 12, color: '#fff', paddingTop: 2, marginTop: 9, marginRight: 5}}>TAB SIZE</Typography>
              <select name="plan" id="plan" className={classes.selectTagForFontSize} onChange={(e) => {handleTabSizeChange(e.target.value)}}>
                <option value={2}>2</option>
                <option value={4} selected>4</option>
                <option value={8}>8</option>
              </select>
            </div>
          </Grid>
          <Grid item>
            <div style={{marginLeft: 25, display: 'flex'}}>
              <Typography style={{fontSize: 12, color: '#fff', paddingTop: 2, marginTop: 9, marginRight: 5}}>THEME</Typography>
              <select name="plan" id="plan" className={classes.selectTagForTheme} onChange={(e) => {handleThemeChange(e.target.value)}}>
                <option value={'monokai'}>Monokai</option>
                <option value={'clouds_midnight'} selected>Midnight</option>
                <option value={'one_dark'}>One dark</option>
                <option value={'nord_dark'}>Nord dark</option>
                <option value={'tomorrow_night'}>Tmrw night</option>
                <option value={'terminal'}>Terminal</option>
                <option value={'solarized_dark'}>Solarized dark</option>
                <option value={'pastel_on_dark'}>Pastel dark</option>
              </select>
            </div>
          </Grid>
          <Grid item style={{marginLeft: 'auto', marginRight: 0, paddingRight: 20, display: 'flex'}}>
            <a href='https://github.com/Dev-Bilaspure/online-ide-Dev_Blocks_IDE' target="_blank"  rel='noopener noreferrer' style={{color: 'inherit', textDecoration: 'none'}}>
              <div className={classes.feelFreeToConnect}>
                <GitHubIcon style={{color: '#fff', height: 22, marginTop: 1}}/>
                <Typography style={{color: '#fff', marginLeft: 7, fontSize: 15, marginTop: 2}}>
                  Github
                </Typography>
              </div>
            </a>
            <a href='https://bit.ly/3DWzbFc-DevB' target="_blank" rel='noopener noreferrer' style={{color: 'inherit', textDecoration: 'none'}}>
              <div className={classes.feelFreeToConnect}>
                <LinkedInIcon style={{color: '#fff', height: 22, marginTop: 1}}/>
                <Typography style={{color: '#fff', marginLeft: 7, fontSize: 15, marginTop: 2}}>
                  Linkedin
                </Typography>
              </div>
            </a>
            <div className={classes.devBlocksIDE}>
              <CodeIcon style={{color: '#fff'}}/> 
              <Typography style={{color: '#fff', marginLeft: 7, fontWeight: 'bold'}}>
                Dev Blocks IDE
              </Typography>
            </div>
          </Grid>
        </Grid>
      </div>
      
    </div>
  )
}

const Alert = forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

export default ControlBar;