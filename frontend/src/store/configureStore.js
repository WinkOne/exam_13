import {createBrowserHistory} from "history";
import {connectRouter, routerMiddleware} from 'connected-react-router';
import {applyMiddleware, combineReducers, compose, createStore,} from 'redux';
import thunkMiddleware from 'redux-thunk';
import usersReducer from "./reducers/usersReducer";
import {loadFromLocalStorage, localStorageMiddleware} from "./localStorage";
import recipeReducer from "./reducers/recipeReducer";
import commentReducer from "./reducers/commentReducer";

export const history = createBrowserHistory();

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const rootReducer = combineReducers({
    router: connectRouter(history),
    users: usersReducer,
    recipe: recipeReducer,
    comment: commentReducer
});
const middleware = [
    thunkMiddleware,
    routerMiddleware(history),
    localStorageMiddleware
];
const enhancers = composeEnhancers(applyMiddleware(...middleware));
const persistedState = loadFromLocalStorage();
const store = createStore(rootReducer, persistedState, enhancers);
export default store;



