import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import configureStore from "./store";
import registerServiceWorker from './registerServiceWorker';

import { Provider } from "react-redux";

ReactDOM.render(
 <Provider store={configureStore()}>
  <App />
 </Provider>,
 document.getElementById('root')
);
registerServiceWorker();