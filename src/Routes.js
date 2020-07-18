import React from "react";
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link,
    useHistory,
    useLocation
} from "react-router-dom";
import LoginPage from './containers/LoginPage';
import HomePage from './containers/HomePage';
import SplashPage from "./containers/SplashPage";
export default function Routes() {
    return (
        <Router>
            <Switch>
                <Route exact path="/">
                    <SplashPage />
                </Route>
                <Route exact path="/login">
                    <LoginPage />
                </Route>
                <Route exact path="/home">
                    <HomePage />
                </Route>
            </Switch>
        </Router>
    );
}
