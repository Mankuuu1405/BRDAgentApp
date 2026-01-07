// App.js
import React from 'react';
import { StatusBar } from 'react-native';
import MainNavigator from './src/navigation/MainNavigator';
// import { COLORS } from './src/utils/constants';

const App = () => {
  return (
    <>
      <StatusBar 
        barStyle="dark-content" 
        backgroundColor= "#FFFFFF"
      />
      <MainNavigator />
    </>
  );
};

export default App;