import React, { useContext, useEffect } from "react";
import { Switch, Route, Redirect } from "react-router-dom";
import Home from "./pages/Home";
import Signin from "./pages/Signin";
import Dashboard from "./pages/Dashboard";
import Signup from "./pages/Signup";
import Details from "./pages/Details";
import Profile from "./pages/Profile";
import Salary from "./pages/Salary";
import Staff from "./pages/Staff";
import Customer from "./pages/Customer";
import Visit from "./pages/Visit";
import { AuthContext } from "./contexts/AuthContext";

function App() {
  const { currentUser } = useContext(AuthContext);

  return (
    <div>
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
          path="/signin"
          render={(props) =>
            !currentUser ? <Signin {...props} /> : <Redirect to="/dashboard" />
          }
        />
        <Route
          exact
          path="/signup"
          render={(props) =>
            !currentUser ? <Signup {...props} /> : <Redirect to="/dashboard" />
          }
        />
        <Route
          exact
          path="/dashboard"
          render={(props) =>
            currentUser ? <Dashboard {...props} /> : <Redirect to="/signin" />
          }
        />
        <Route
          exact
          path="/add-business"
          render={(props) =>
            currentUser ? <Details {...props} /> : <Redirect to="/signin" />
          }
        />
        <Route
          exact
          path="/profile"
          render={(props) =>
            currentUser ? <Profile {...props} /> : <Redirect to="/signin" />
          }
        />
        <Route
          exact
          path="/staff"
          render={(props) =>
            currentUser ? <Staff {...props} /> : <Redirect to="/signin" />
          }
        />
        <Route
          exact
          path="/salary"
          render={(props) =>
            currentUser ? <Salary {...props} /> : <Redirect to="/signin" />
          }
        />
        <Route
          exact
          path="/customer"
          render={(props) =>
            currentUser ? <Customer {...props} /> : <Redirect to="/signin" />
          }
        />
        <Route
          exact
          path="/visit"
          render={(props) =>
            currentUser ? <Visit {...props} /> : <Redirect to="/signin" />
          }
        />
      </Switch>
    </div>
  );
}

export default App;
