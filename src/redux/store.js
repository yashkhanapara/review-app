// ** Redux, Thunk & Root Reducer Imports
import thunk from "redux-thunk";
import rootReducer from "./reducers/rootReducer";
import { createStore, applyMiddleware, compose } from "redux";
import {
    useDispatch as useReduxDispatch,
    useSelector as useReduxSelector,
} from "react-redux";

// ** init middleware
const middleware = [thunk];

// ** Dev Tools
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

// convert object to string and store in localStorage
function saveToLocalStorage(state) {
    try {
      const serialisedState = JSON.stringify(state);
      localStorage.setItem("persistantState", serialisedState);
    } catch (e) {
      console.warn(e);
    }
  }
  
  // load string from localStarage and convert into an Object
  // invalid output must be undefined
  function loadFromLocalStorage() {
    try {
      const serialisedState = localStorage.getItem("persistantState");
      if (serialisedState === null) return undefined;
      return JSON.parse(serialisedState);
    } catch (e) {
      console.warn(e);
      return undefined;
    }
  }

// ** Create store
const store = createStore(
    rootReducer,loadFromLocalStorage(),
    composeEnhancers(applyMiddleware(...middleware)),
);

store.subscribe(() => saveToLocalStorage(store.getState()));


export const useSelector = useReduxSelector;

export const useDispatch = () => useReduxDispatch();

export { store };
