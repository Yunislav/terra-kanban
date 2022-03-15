import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { createGlobalStyle } from 'styled-components';

import store from './store';
import App from './App';

const GlobalStyle = createGlobalStyle`
 :root {
    --color-gray: #dfe3e6;
    --color-black: #181818;
    --color-blue: #0A192F;
  }
  body {
    font-family: "Roboto Mono",monospace;
    font-size: 1rem;
    font-weight: 300;
    line-height: 1.5;
    color: #181818;
  }
`;

ReactDOM.render(
  <Provider store={store}>
    <GlobalStyle />
    <App />
  </Provider>,
  document.getElementById('root')
);
