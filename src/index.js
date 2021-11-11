import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import FirebaseContext from "./context/firebase";
import { firebase, FieldValue } from "./lib/firebase";

ReactDOM.render(
  <FirebaseContext.Provider value={{ firebase, FieldValue }}>
    <App />
  </FirebaseContext.Provider>,
  document.getElementById("root")
);

// client side rendered app :react
// - database whiuch is irebase
// - react-loading-skeleton
//  - tailwind

// folder structure

//   src
// -> components
// -> pages
// -> constants
// -> helpers
// -> hooks
// -> contexts
// -> lib (firebase live in here)
// -> services (firebase functions)
// -> styles (tailwind's folder app/tailwind)
