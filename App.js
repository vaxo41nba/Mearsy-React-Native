import 'react-native-gesture-handler';

import React from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

import { applyMiddleware, createStore } from 'redux';
import { Provider } from 'react-redux';
import { persistStore, persistReducer } from 'redux-persist';
import { PersistGate } from 'redux-persist/es/integration/react';
import createSagaMiddleware from 'redux-saga';
import { composeWithDevTools } from 'redux-devtools-extension';
import SQLite from 'react-native-sqlite-storage';
import reducer from './src/redux/rootReducer';
import mySaga from './src/redux/sagas';

import Navigator from './src/navigation';

const sagaMiddleware = createSagaMiddleware();

// SQLite.DEBUG(true);
SQLite.enablePromise(false);

const persistConfig = {
  key: 'root',
  storage: AsyncStorage,
  whiteList: [''],
};
const persistedReducer = persistReducer(persistConfig, reducer);

const store = createStore(
  persistedReducer,
  composeWithDevTools(applyMiddleware(sagaMiddleware)),
);

sagaMiddleware.run(mySaga);

const persistedStore = persistStore(store);

const App = () => (
  <Provider store={store}>
    <PersistGate persistor={persistedStore} loading={null}>
      <Navigator />
    </PersistGate>
  </Provider>
);

export default App;
