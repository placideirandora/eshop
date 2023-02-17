/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React from 'react';
import Toast from 'react-native-toast-message';

import {Navigation} from './src/navigation';

function App(): JSX.Element {
  return (
    <>
      <Navigation />
      <Toast />
    </>
  );
}

export default App;
