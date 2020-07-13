import React from "react";
import { useSelector } from "react-redux";
import { sharedFields as sF } from "fields/sharedfields";
import { Route, BrowserRouter as Router, Switch } from "react-router-dom";
import { navRoutes } from "navRoutes";
import { Landing } from "./pages/Landing";
import { Dashboard } from "./pages/Dashboard";
import { Login } from "./pages/Login";
import { Settings } from "./pages/Settings";
import { TicketBoard } from "./pages/Ticketboard/";
import { Logout } from "./pages/Logout";
import { Register } from "./pages/Register";
import { Index } from "./pages/Index";

function Routing() {
    return (
        <div
            style={{
                display: "flex",
                flexDirection: "column",
                marginBottom: "80px",
            }}
        >
            <Router>
                <div style={{ width: "100%" }}>
                    <Switch>
                        <Route exact path={navRoutes.login} component={Login} />
                        <Route
                            exact
                            path={navRoutes.logout}
                            component={Logout}
                        />
                        <Route
                            exact
                            path={navRoutes.register}
                            component={Register}
                        />
                        <Route
                            exact
                            path={navRoutes.settings}
                            component={Settings}
                        />
                        <Route
                            exact
                            path={navRoutes.dashboard}
                            component={Dashboard}
                        />
                        <Route
                            exact
                            path={navRoutes.ticketboard}
                            component={TicketBoard}
                        />
                        <Route
                            exact
                            path={navRoutes.Landing}
                            component={Landing}
                        />
                        <Route component={Index} />
                    </Switch>
                </div>
            </Router>
        </div>
    );
}

export { Routing };
