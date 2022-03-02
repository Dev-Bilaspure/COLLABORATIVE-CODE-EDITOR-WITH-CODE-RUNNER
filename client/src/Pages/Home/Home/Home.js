import { Grid } from '@material-ui/core'
import React, { useState } from 'react'
import ControlBar from '../../../components/ControlBar/ControlBar'
import Editor from '../../../components/Editor'
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
      <div style={{marginTop: 40}}>
        <Grid container style={{background: 'rgb(33,33,32)'}}>
          <Grid item lg={!showInputOutput ? 12 : 8} md={!showInputOutput ? 12 : 8} sm={12} xs={12}>
            <Editor/>
          </Grid>
          {
            showInputOutput && 
            <Grid item lg={4} md={4} sm={12} xs={12}>
              <InputAndOutput />
            </Grid>
          }
        </Grid>
      </div>
      
    </div>
  )
}

export default Home