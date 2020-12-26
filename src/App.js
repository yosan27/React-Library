import React, { Component } from 'react';

import MainNavigations from './Navigations/MainNavigations';
import MainNavigationsUser from './Navigations/MainNavigationsUser';
import 'react-app-polyfill/stable';

class App extends Component {

  render() {
    return (
      // <MainNavigations />
      <MainNavigationsUser />
    );
  }
}

export default App;