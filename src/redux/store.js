import {
    applyMiddleware,
    combineReducers,
    createStore,
  } from "@reduxjs/toolkit";
  import thunk from "redux-thunk";
  import { ResponseReducer } from "./ResponseReducer";
  
  const rootReducer = combineReducers({
    response: ResponseReducer,
  });
  
  const store = createStore(rootReducer, applyMiddleware(thunk));
  export { store };
  