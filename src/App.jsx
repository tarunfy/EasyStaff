import React, { useContext } from "react";
import { Switch, Route, Redirect } from "react-router-dom";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import Verify from "./pages/Verify";
import { AuthContext } from "./contexts/AuthContext";

function App() {
  const { currentUser } = useContext(AuthContext);

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
        <Route
          exact
          path="/verify"
          render={(props) =>
            !currentUser ? <Verify {...props} /> : <Redirect to="/dashboard" />
          }
        />
      </Switch>
    </div>
  );
}

export default App;
