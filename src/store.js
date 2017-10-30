// NOTE: Documentation for redux devtools: https://github.com/zalmoxisus/redux-devtools-extension
// NOTE: Document to synchronise react router + redux: https://github.com/supasate/test-react-router-v4-with-connected-router/blob/master/src/index.js
// NOTE: documentation for the react-router-redux v5 alpha, but the "time travel feature" with the devtools dont work accurately: https://github.com/ReactTraining/react-router/tree/master/packages/react-router-redux

import { applyMiddleware, combineReducers, createStore } from "redux";
import { connectRouter, routerMiddleware } from "connected-react-router";

import { composeWithDevTools } from "redux-devtools-extension";
import { createLogger } from "redux-logger";
import { reducers } from "./reducers";
import thunk from "redux-thunk";

export function configureStore(history) {
    const rootReducer = connectRouter(history)(combineReducers({ ...reducers }));
    const enhancers = composeWithDevTools(applyMiddleware(thunk, createLogger(), routerMiddleware(history)));
    const store = createStore(rootReducer, enhancers);

    // if (module.hot) {
    //     // Enable Webpack hot module replacement for reducers.
    //     module.hot.accept("./reducers", () => {
    //         const nextRootReducer = require("./reducers").default;

    //         store.replaceReducer(nextRootReducer);
    //     });
    // }

    return store;
};
