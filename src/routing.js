import React from "react";
import { useSelector } from "react-redux";
import { sharedFields as sF } from "fields/sharedfields";
import { Route, BrowserRouter as Router, Switch } from "react-router-dom";
import { MainNavbar } from "util/components/navbars/MainNavbar";
import { Landing } from "./pages/Landing";
import { Dashboard } from "./pages/Dashboard";
import { Login } from "./pages/Login";
import { Settings } from "./pages/Settings";
import { TicketBoard } from "./pages/Ticketboard/";
import { Logout } from "./pages/Logout";
import { Register } from "./pages/Register";
import { navRoutes } from "navRoutes";
function Routing() {
    let loggedIn = null;
    loggedIn = useSelector((state) => {
        return state.shared[sF.LOGGED_IN];
    });

    return (
        <div style={{ display: "flex" }}>
            <Router>
                <MainNavbar />
                <div style={{ width: "100%" }}>
                    <Switch>
                        <Route exact path="/login" component={Login} />
                        <Route exact path="/logout" component={Logout} />
                        <Route exact path="/register" component={Register} />
                        <Route
                            exact
                            path={navRoutes.settings}
                            component={Settings}
                        />
                        <Route exact path="/dashboard" component={Dashboard} />
                        <Route
                            exact
                            path="/ticketboard"
                            component={TicketBoard}
                        />
                        <Route component={loggedIn ? Dashboard : Landing} />
                    </Switch>
                </div>
            </Router>
        </div>
    );
}

export { Routing };
