import React, { Component } from "react";
import Sidebar from "./util/sidebar.jsx";
import { createStore } from "redux";
import { Provider } from "react-redux";
import { combinedReducer } from "reducers/combinedreducer.js";
import "./index.css";
import Dashboard from "./pages/Dashboard/dashboard.jsx";
import { TicketBoard } from "./pages/Ticketboard/ticketboard.jsx";
import { Navbar } from "util/navbar.jsx";
export default class App extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        let style = {
            display: "flex",
            position: "relative",
        };
        let store = createStore(combinedReducer);

        return (
            <Provider store={store}>
                <div className="main" style={style} className="defaultStyle">
                    <Navbar />
                    {/* <Dashboard x={store} /> */}
                    <TicketBoard store={store} />
                </div>
            </Provider>
        );
    }
}
