import React, { Component } from "react";
import TicketForm from "./components/pages/ticketform.jsx";
import Sidebar from "./components/sidebar.jsx";
import TicketBoard from "./components/ticketboard.jsx";
import { createStore } from "redux";
import { Provider } from "react-redux";
import reducer from "./reduxitems/reducer.js";
import "./index.css";

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
                <div className="main" style={style}>
                    <Sidebar />
                    <TicketBoard store={store} />
                </div>
            </Provider>
        );
    }
}
