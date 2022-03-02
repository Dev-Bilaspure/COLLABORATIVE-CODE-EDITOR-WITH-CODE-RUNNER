import { makeStyles } from "@material-ui/core";

const useStyle = makeStyles({
  inputTextArea: {
    border: 'none',
    outline: 'none',
    '&:focus': {
      outline: 'none !important',
      border: 'none'
    },
    resize: 'none',
    overflowWrap: 'break-word',
    background: 'rgb(33,33,32)',
    color: '#fff',
    fontSize: 17,
    paddingLeft: 10,
    paddingTop: 10,
    '-webkit-box-sizing': 'border-box',
    '-moz-box-sizing': 'border-box',
    boxSizing: 'border-box',
    fontFamily: `'Roboto', 'sans-serif'`,
    width: '100%',
  },
  outputTextArea: {
    border: 'none',
    outline: 'none',
    '&:focus': {
      outline: 'none !important',
      border: 'nonegggggg'
    },
    resize: 'none',
    paddingLeft: 10,
    paddingTop: 10,
    overflowWrap: 'break-word',
    background: 'rgb(33,33,32)',
    color: '#fff',
    fontSize: 17,
    '-webkit-box-sizing': 'border-box',
    '-moz-box-sizing': 'border-box',
    boxSizing: 'border-box',
    fontFamily: `'Roboto', 'sans-serif'`,
    width: '100%'
  }
})

export default useStyle;