import { configureStore } from "@reduxjs/toolkit";

// reducers
import userReducer from "./user.slice";
import layoutReducer from "./layout.slice";
import toursReducer from "./tours.slice";
import destinationsReducer from "./destinations.slice";

const store = configureStore({
  reducer: {
    user: userReducer,
    layout: layoutReducer,
    tours: toursReducer,
    destinations: destinationsReducer,
  },
});

export default store;
