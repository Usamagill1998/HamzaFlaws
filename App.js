import React from "react";
import { StatusBar } from 'react-native'
import Routes from "./Routes";
import { createStore, applyMiddleware } from "redux";
import { Provider } from "react-redux";
import reduxThunk from "redux-thunk";

import reducers from "./src/Reducers";

export default function App() {
  const store = createStore(reducers, applyMiddleware(reduxThunk));
  return (
    <Provider store={store}>
      <StatusBar
    animated={true}
    backgroundColor="#282B30"
     barStyle="dark-content"
     />
      <Routes />
    </Provider>
  );
}
