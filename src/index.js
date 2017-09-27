import './test/test'
import '../assets/app.scss'
import "../views/index.pug"

if (module.hot) {
  module.hot.accept('./test/test', () => {
    console.log('OK !')
  })
}

import React from 'react'
import ReactDom from 'react-dom'
import { AppContainer } from 'react-hot-loader'

import { App } from './containers/root'

ReactDom.render(
  <AppContainer>
    <App/>
  </AppContainer>,
  document.getElementById('new_root')
);

if (module.hot) {
  module.hot.accept('./containers/root', () => {
    ReactDom.render(
      <AppContainer>
        <App/>
      </AppContainer>,
      document.getElementById('new_root')
    );
  });
}
