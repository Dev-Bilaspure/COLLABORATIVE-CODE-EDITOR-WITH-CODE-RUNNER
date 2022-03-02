import React from 'react'
import ReactDOM from 'react-dom'
import App from './App';
import EditorContextProvider from './Contexts/EditorContext';

ReactDOM.render(
  <EditorContextProvider>
    <App />
  </EditorContextProvider>, 
  document.getElementById('root')
);