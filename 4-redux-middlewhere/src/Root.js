import React from "react";
import { Provider } from "react-redux";
import { createStore, applyMiddleware } from "redux";
import reducers from "reducers";
import async from "middlewares/async";

export default (props) => {
  const store = createStore(
    reducers,
    props.initialState,
    applyMiddleware(async)
  );
  return <Provider store={store}>{props.children}</Provider>;
};
