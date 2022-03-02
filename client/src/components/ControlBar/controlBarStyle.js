import { makeStyles } from "@material-ui/core";

const useStyle = makeStyles({
  runBtn: {
    boxShadow: 'none', 
    marginLeft: 15, 
    borderRadius: 50, 
    // background: 'rgb(226,28,59)', 
    color: '#fff', 
    height: 40, 
    paddingRight: 13, 
    paddingLeft: 5,
    '&:hover': {
      color: '#fff',
      // background: 'rgb(226,28,59)'
    }
  },
  selectTag: {
    background: 'rgb(33,33,32)', 
    color: '#fff', 
    height: 40, 
    outline: 'none', 
    border: 'none', 
    width: 95, 
    fontSize: 15,
    '&:hover': {
      cursor: 'pointer',
    }
  }, 
  inputsKeyboard: {
    marginLeft: 25, 
    marginTop: 9, 
    display: 'flex',
    '&:hover': {
      cursor: 'pointer'
    }
  },
  selectTagForFontSize: {
    background: 'rgb(33,33,32)', 
    color: '#fff', 
    height: 40, 
    outline: 'none', 
    border: 'none', 
    width: 40, 
    fontSize: 15,
    '&:hover': {
      cursor: 'pointer',
    }
  },
  selectTagForTheme: {
    background: 'rgb(33,33,32)', 
    color: '#fff', 
    height: 40, 
    outline: 'none', 
    border: 'none', 
    width: 125, 
    fontSize: 15,
    '&:hover': {
      cursor: 'pointer',
    }
  },
  feelFreeToConnect: {
    background: 'rgb(226,28,59)', 
    display: 'flex', 
    paddingLeft: 10, 
    paddingRight: 15, 
    height: 27, 
    marginTop: 5, 
    paddingTop: 3, 
    borderRadius: 0,
    '&:hover': {
      cursor: 'pointer'
    },
    marginLeft: 20
  }, 
  devBlocksIDE: {
    background: 'rgb(226,28,59)', 
    display: 'flex', 
    paddingLeft: 10, 
    paddingRight: 15, 
    height: 27, 
    marginTop: 5, 
    paddingTop: 3, 
    borderRadius: 5, 
    marginLeft: 20
  },
  alertCompError: {
    color: '#fff', 
    background: 'rgb(217,70,71)',
    "& .MuiAlert-icon": {
      color: '#fff'
    }
  },
  alertCompSuccess: {
    color: '#fff', 
    background: 'rgb(76,155,81)',
    "& .MuiAlert-icon": {
      color: '#fff'
    }
  }
})

export default useStyle;