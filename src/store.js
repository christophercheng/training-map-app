import rootReducer from "./reducers/RootReducer";
import thunk from "redux-thunk";

import { createStore, applyMiddleware } from "redux";

export default function configureStore(initialState={}) {
 return createStore(
  rootReducer,
   applyMiddleware(thunk)
 );
}
