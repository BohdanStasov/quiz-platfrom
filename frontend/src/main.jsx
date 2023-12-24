import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { persistor, store } from './redux/store';
import { Provider } from "react-redux";
import { StateContext } from './context/StateContext.jsx';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Provider store= {store}>
      <StateContext>
        <App />
      </StateContext>
    </Provider>
  </React.StrictMode>,
)
