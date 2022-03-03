import { TextareaAutosize, Typography } from '@material-ui/core'
import React, { useContext } from 'react'
import { EditorContext } from '../../Contexts/EditorContext'
import useStyle from './inputNOutputStyle'

const InputAndOutput = () => {
  const classes = useStyle();
  const {output, inputs, handleInputsChange} = useContext(EditorContext);
  return (
    <div style={{background: 'rgb(33,33,32)'}}>
      <div>
        <div style={{background: 'rgb(38,39,38)', paddingTop: 15, paddingBottom: 15, paddingLeft: 17}}>
          <Typography style={{color: '#fff'}} >
            Input
          </Typography>
        </div>
        <textarea
          className={classes.inputTextArea}
          onChange={(e) => {handleInputsChange(e.target.value)}}
          value={inputs}
          placeholder="Enter Input"
          style={{height: '37vh'}}
        />
      </div>
      <div>
        <div style={{background: 'rgb(38,39,38)', paddingTop: 15, paddingBottom: 15, paddingLeft: 17}}>
          <Typography style={{color: '#fff'}} >
            Output
          </Typography>
        </div>
        <textarea 
          readOnly={true}
          className={classes.outputTextArea}
          value={output}
          style={{height: '38vh'}}
        />
      </div>
    </div>
  )
}

export default InputAndOutput