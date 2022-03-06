import { Grid } from '@material-ui/core'
import React, { useState } from 'react'
import ControlBar from '../../../components/ControlBar/ControlBar'
import Editor from '../../../components/Editor/Editor'
import InputAndOutput from '../../../components/InputAndOutput/InputAndOutput'
import './homeStyle.css'
const Home = () => {
  const [showInputOutput, setShowInputOutput] = useState(true)
  const handleInputIconClick = () => {
    setShowInputOutput(!showInputOutput)
  }
  return (
    <div className="homewrapper">
      <ControlBar handleInputIconClick={handleInputIconClick}/>
      <div style={{marginTop: 42, background: 'rgb(33,33,32)'}}>
        <Grid container >
          <Grid item lg={!showInputOutput ? 12 : 8} md={!showInputOutput ? 12 : 8} sm={12} xs={12} xl={!showInputOutput ? 12 : 9}>
            <Editor/>
          </Grid>
          {
            showInputOutput && 
            <Grid item lg={4} md={4} sm={12} xs={12} xl={3}>
              <InputAndOutput />
            </Grid>
          }
        </Grid>
      </div>
      
    </div>
  )
}

export default Home