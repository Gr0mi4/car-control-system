import './index.scss';

import 'fontsource-roboto';
import '@fontsource/montserrat/100.css';
import '@fontsource/montserrat/200.css';
import '@fontsource/montserrat/300.css';
import '@fontsource/montserrat/400.css';
import '@fontsource/montserrat/500.css';
import '@fontsource/montserrat/600.css';
import '@fontsource/montserrat/700.css';

import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';

import store from './store/store';

import MainLayout from './views/mainLayout';

ReactDOM.render(
  <Provider store={ store }>
    <BrowserRouter>
      <MainLayout/>
    </BrowserRouter>
  </Provider>,
  document.getElementById('root')
);

