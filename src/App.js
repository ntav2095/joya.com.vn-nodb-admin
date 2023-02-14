// main
import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { Route, Routes } from "react-router-dom";

// components
import RequireAuth from "./components/RequireAuth";

// routes
import routes from "./routes";
import { fetchDestinations } from "./store/destinations.slice";

// actions
import { fetchTours } from "./store/tours.slice";

function App() {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchTours());
    dispatch(fetchDestinations());
  }, []);
  return (
    <Routes>
      {routes.map((route, index) => {
        const children = route.path ? (
          <Route key={route.path} path={route.path} element={route.element} />
        ) : (
          <>
            {route.paths.map((path) => (
              <Route key={path} path={path} element={route.element} />
            ))}
          </>
        );

        if (route.requiredAuth) {
          return (
            <Route key={index} element={<RequireAuth />}>
              {children}
            </Route>
          );
        }

        return children;
      })}
    </Routes>
  );
}

export default App;
