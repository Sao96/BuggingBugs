import React, { Component } from "react";
import {
    Route,
    BrowserRouter as Router,
    Switch,
    Redirect,
} from "react-router-dom";
import { MainNavbar } from "util/components/navbars/MainNavbar";
import { Landing } from "./pages/Landing";
// import Dashboard from "./pages/Dashboard/dashboard.jsx";
// import { Login } from "./pages/Login";
// import { TicketBoard } from "./pages/Ticketboard/";
// import { Logout } from "./pages/Logout";
// import { Register } from "./pages/Register";
function Routing() {
    return (
        <Router>
            {/* switch this path to 404 for default */}
            {/* <MainNavbar /> */}
            <Switch>
                {/* <Route exact path="/login" component={Login} />
                <Route exact path="/register" component={Register} />
                <Route exact path="/dashboard" component={Dashboard} />
                <Route exact path="/ticketboard" component={TicketBoard} />
                <Route exact path="/logout" component={Logout} /> */}
                <Route component={Landing} />
            </Switch>
        </Router>
    );
}

export { Routing };
