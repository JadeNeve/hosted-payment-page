import React from 'react';
import ReactDOM from 'react-dom/client';
import Provider from './app/Provider';
import { App } from './app/App';
import '../src/theme/index.css'
import { Buffer } from 'buffer';

if (!window.Buffer) {
  window.Buffer = Buffer;
}

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <Provider>
      <App />
    </Provider>
  </React.StrictMode>
);
