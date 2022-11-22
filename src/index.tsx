import React from 'react';
import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';

import { MyStore } from 'redux/store';
import { App } from 'components';
import './index.scss';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

root.render(
  <React.StrictMode>
    <Provider store={MyStore}>
      <App />
    </Provider>
  </React.StrictMode>
);
