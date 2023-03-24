// ** Redux Imports
import { combineReducers } from "redux";

// ** Reducers Imports
import toastNotification from "./toastNotification";
import reviewReducer from "./review";

const rootReducer = combineReducers({
    toastNotification,
    reviewReducer,
});

export default rootReducer;
