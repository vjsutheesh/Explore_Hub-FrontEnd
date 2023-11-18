import "./App.css";
import {
  BrowserRouter as Router,
  Route,
  Redirect,
  Switch,
} from "react-router-dom";
import Users from "./users/pages/Users";
import NewPlace from "./places/pages/NewPlace";
import MainNavigation from "./shared/components/Navigation/MainNavigation";
import UserPlaces from "./places/pages/UserPlaces";
import UpdatePlace from "./places/pages/UpdatePlace";
import Auth from "./users/pages/Auth";
import { AuthContext } from "./shared/context/auth-context";
import { useState, useCallback } from "react";
function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userId , setuserId] = useState(false)
  const login = useCallback((uid) => {
    setIsLoggedIn(true);
    setuserId(uid)
  }, []);
  const logout = useCallback(() => {
    setIsLoggedIn(false);
    setuserId(null)
  }, []);
  let routes;
  if (isLoggedIn) {
    routes = (
      <>
        <Switch>
          <Route exact path="/">
            <Users></Users>
          </Route>
          <Route exact path="/:userId/places">
            <UserPlaces></UserPlaces>
          </Route>
          <Route exact path="/places/new">
            <NewPlace></NewPlace>
          </Route>
          <Route path="/places/:placeId">
            <UpdatePlace />
          </Route>
          <Redirect to="/" />
        </Switch>
      </>
    );
  } else {
    routes = (
      <>
        <Switch>
          <Route exact path="/">
            <Users></Users>
          </Route>
          <Route exact path="/:userId/places">
            <UserPlaces></UserPlaces>
          </Route>
          <Route exact path="/auth">
            <Auth />
          </Route>
          <Redirect to="/auth" />
        </Switch>
      </>
    );
  }
  return (
    <AuthContext.Provider
      value={{ isLoggedIn: isLoggedIn,userId :userId ,login: login, logout: logout }}
    >
      <Router>
        <MainNavigation />
        <main>{routes}</main>
      </Router>
    </AuthContext.Provider>
  );
}

export default App;
