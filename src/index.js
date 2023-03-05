import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { BrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";

import store from "./store";
import { setUser } from "./store/user.slice";
import { storeInjector } from "./services/axios";

import i18n from "./services/languages/i18n";
import { i18nInjector } from "./hooks/useAxios";

// config quill
import configQuill from "./services/helpers/quill/configQuill";

// css bootstrap
import "bootstrap/dist/css/bootstrap.min.css";

// // react slick
// import "slick-carousel/slick/slick.css";
// import "slick-carousel/slick/slick-theme.css";

// general css
import "./assets/css/variables.css";
import "./assets/css/normalize.css";

import "./App.css";

// injecting
storeInjector(store);
i18nInjector(i18n);

let user = localStorage.getItem("user");
if (user) {
  try {
    user = JSON.parse(user);
  } catch (error) {
    user = null;
  }
}

store.dispatch(setUser(user));

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <BrowserRouter>
    <Provider store={store}>
      <App />
    </Provider>
  </BrowserRouter>
);
