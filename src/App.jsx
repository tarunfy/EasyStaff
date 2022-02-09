import React, { useState } from "react";
import { Switch, Route, Redirect } from "react-router-dom";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";

function App() {
  const [currentUser, setCurrentUser] = useState(false);
  return (
    <div className="font-Ubuntu">
      <Switch>
        <Route
          exact
          path="/"
          render={(props) =>
            !currentUser ? <Home {...props} /> : <Redirect to="/dashboard" />
          }
        />
        <Route
          exact
          path="/login"
          render={(props) =>
            !currentUser ? <Login {...props} /> : <Redirect to="/dashboard" />
          }
        />
        <Route
          exact
          path="/dashboard"
          render={(props) =>
            currentUser ? <Dashboard {...props} /> : <Redirect to="/login" />
          }
        />
      </Switch>
    </div>
  );
}

export default App;
