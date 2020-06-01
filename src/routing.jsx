import React, { Component } from "react";
import {
    Route,
    BrowserRouter as Router,
    Switch,
    Redirect,
} from "react-router-dom";
import Dashboard from "./pages/Dashboard/dashboard.jsx";
import { TicketBoard } from "./pages/Ticketboard/";
import { Landing } from "./pages/Landing";

function Routing() {
    return (
        <Router>
            {/* switch this path to 404 for default */}
            <Switch>
                <Route exact path="/dashboard" component={Dashboard} />
                <Route exact path="/ticketboard" component={TicketBoard} />
                <Route component={Landing} />
            </Switch>
        </Router>
    );
}

export { Routing };
