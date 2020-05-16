import React, { Component } from "react";
import TicketForm from "./components/pages/Ticketboard/ticketform.jsx";
import Sidebar from "./components/sidebar.jsx";
import TicketBoard from "./components/pages/Ticketboard/ticketboard.jsx";
import { createStore } from "redux";
import { Provider } from "react-redux";
import reducer from "./reduxitems/reducer.js";
import "./index.css";
import Dashboard from "./components/pages/Dashboard/dashboard.jsx";

export default class App extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        let style = {
            display: "flex",
            position: "relative",
        };
        let store = createStore(reducer);
        return (
            <Provider store={store}>
                <div className="main" style={style} className="defaultStyle">
                    <Sidebar />
                    <Dashboard x={store} />
                    {/* <TicketBoard store={store} /> */}
                </div>
            </Provider>
        );
    }
}
