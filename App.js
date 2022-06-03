import React, {Component} from 'react';
import 'react-native-gesture-handler';
import {LogBox} from 'react-native';
import RootNavigator from './RootNavigator';
import {Provider} from 'react-redux';
import {persistedStore, store} from './src/app/reducer/sliceApp';
//import { PersistGate } from 'redux-persist/lib/integration/react';
import { PersistGate } from 'redux-persist/integration/react';

function App() {
  LogBox.ignoreLogs(['Warning: ...']);

  LogBox.ignoreAllLogs();

  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistedStore}>
        <RootNavigator />
      </PersistGate>
    </Provider>
  );
}

export default App;
