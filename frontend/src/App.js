import React, {Component} from 'react';
import AppMainRouter from './components/AppMainRouter/AppMainRouter';

import {AuthProvider} from './context/AuthContext';

//import AuthContext, {AuthProvider} from './context/AuthContext';

// for method 3
//import {AuthConsumer} from './context/AuthContext';

class App extends Component {

  render(){
    return (
      <AuthProvider>
        <AppMainRouter />
      </AuthProvider>
    )
  }
}

export default App;
