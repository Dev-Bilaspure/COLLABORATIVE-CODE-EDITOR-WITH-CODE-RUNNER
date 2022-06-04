import React, { useContext, useState } from 'react'
import Dialog from '@mui/material/Dialog';
import { EditorContext } from '../../Contexts/EditorContext';
import { Button, Typography } from '@material-ui/core';
import fileDownload from 'js-file-download';

const FileDownloadDialogBox = () => {
  const { isDialogBoxVisible, handleToggleDialogBox, fileName, handleFileNameChange, code, language } = useContext(EditorContext);
  
  const getExtension = (lang) => {
    if(lang==='python3')
      return('py');
    else if(lang==='nodejs')
      return('js');
    else if(lang==='kotlin')
      return('kt');
    else if(lang==='csharp')
      return('cs');
    else if(lang==='go')
      return('go');
    else if(lang==='rust')
      return('rs');
    else if(lang==='ruby')
      return('rb');
    else if(lang==='scala')
      return('sc');
    else if(lang==='dart')
      return('dart');
    else 
      return(lang);
  }
  
  const handleDownloadFile = () => {
    if(fileName==='')
      handleFileNameChange('code');
    fileDownload(code, `${fileName==='' ? 'code' : fileName}.${getExtension(language)}`);
    handleToggleDialogBox();
  }
  return (
    <div style={{background: "rgb(33,32,33)"}}>
      <Dialog onClose={handleToggleDialogBox} open={isDialogBoxVisible}>
        <div style={{width: 500}}>
          <div style={{background: "rgb(33,32,33)", textAlign: 'center', paddingTop: 10, paddingBottom: 10, borderBottom: '2px solid rgb(28, 28, 28)'}}>
            <Typography style={{color: '#fff', fontSize: 21, fontFamily: `'Poppins', sans-serif`}}>
              CONFIRM FILE NAME
            </Typography>
          </div>
          <div style={{background: "rgb(30,31,31)", textAlign: 'center', display: 'flex', alignItems: 'center', justifyContent: 'center', paddingTop: 50, paddingBottom: 50}}>
            <Typography style={{color: '#fff', fontSize: 15, marginRight: 10}}>FILE NAME: </Typography>
            <div style={{paddingLeft: 8, borderBottom: '1px solid #fff', paddingRight: 8, paddingBottom: 7}}>
              <input 
                type="text" 
                style={{outline: 'none', color: '#fff', background: "rgb(30,31,31)", border: 'none', fontSize: 14}}
                value={fileName}
                onChange={(e) => handleFileNameChange(e.target.value)}
              />
            </div>
          </div>
          <div style={{background: "rgb(33,32,33)", paddingTop: 10, paddingBottom: 10, borderTop: '2px solid rgb(28, 28, 28)', display: 'flex', alignItems: 'right', justifyContent: 'right', paddingRight: 10}}>
            <Button variant="contained" style={{background: 'rgb(221,53,68)', color: '#fff'}} onClick={handleDownloadFile}>
              <Typography>
                DOWNLOAD
              </Typography>
            </Button>
          </div>
        </div>
      </Dialog>
    </div>
  )
}

export default FileDownloadDialogBox