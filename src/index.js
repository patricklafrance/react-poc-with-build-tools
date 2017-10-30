// NOTE: sample for connected router: https://github.com/supasate/test-react-router-v4-with-connected-router/blob/master/src/index.js
// NOTE: documentation for the react-router-redux v5 alpha, but the "time travel feature" with the devtools dont work accurately: https://github.com/ReactTraining/react-router/tree/master/packages/react-router-redux
// NOTE: OV React documentation: https://gsoftdev.atlassian.net/wiki/spaces/OV/pages/49446996/React
// NOTE: Understand React lifecycle: https://medium.com/@baphemot/understanding-reactjs-component-life-cycle-823a640b3e8d

// NOTE: Reacr HMR setup instructions: https://gaearon.github.io/react-hot-loader/getstarted/

// WHY REDUX?
// - Developer experience
//   - Sans redux, le hot module replacement ne fonctionne pas. Si un module (par exemple un Component) contient de l'état, il ne peut pas être hot replace.
//   - Hot module replacement fonctionne juste avec des fonctions pures
//   - Time travel + chrome devtools
// - Separation of concerns
//   - The point is to decouple “what happened” from “how the state changes”.
// - One state, state in React + redux is the equivalent of SGO session
// - Build in pub / sub
// - Performance optimization since it's predictable and immutable
//   - Redux + PureComponent reduce the cost to detecte state mutation since we can use reference equality.

// RULES:
// - React render function must be pure
// - Your reducers must be pure (deterministic).
//    - Any logic with side effects (non-deterministic) (external services, async code) belong in an action (via something like redux-thunk and/or redux-saga)
// - Use selectors everywhere. Even for the most trivial ones.
// - Use Reselect for selectors that need to be memoized (like derived data).

import "whatwg-fetch";

import App from "./app";
import { AppContainer } from "react-hot-loader";
import { ConnectedRouter } from "connected-react-router";
import { Provider } from "react-redux";
import React from "react";
import { configureStore } from "./store";
import createHistory from "history/createBrowserHistory";
import { render } from "react-dom";

const history = createHistory();
const store = configureStore(history);

history.listen(location => {
    console.log(`Tracking location changed to: ${location.pathname}`);
});

const renderForReal = (Component) => {
    return render(
        <AppContainer>
            <Provider store={store}>
                <ConnectedRouter history={history}>
                    <Component />
                </ConnectedRouter>
            </Provider>
        </AppContainer>,
        // eslint-disable-next-line
        $("[data-app-container]")[0]
    );
};

// const renderForReal = (Component) => {
//     return render(
//         <Provider store={store}>
//             <ConnectedRouter history={history}>
//                 <Component />
//             </ConnectedRouter>
//         </Provider>,
//         // eslint-disable-next-line
//         $("[data-app-container]")[0]
//     );
// };

renderForReal(App);

// if (module.hot) {
//     module.hot.accept("./app", () => { render(App) });
// }

if (module.hot) {
    module.hot.accept("./app", () => {
        const NextApp = require("./app").default;
        renderForReal(NextApp);
    });
}
