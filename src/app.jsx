import React, { Component } from "react";
import Sidebar from "./util/sidebar.jsx";
import { createStore } from "redux";
import { Provider } from "react-redux";
import { combinedReducer } from "reducers/combinedreducer.js";
import "./index.css";
import { Navbar } from "util/navbar.jsx";
import { Routing } from "./routing.jsx";
import "babel-polyfill";
export default class App extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        let style = {
            display: "flex",
            position: "relative",
        };

        const store = createStore(combinedReducer);
        return (
            <Provider store={store}>
                <div className="main" style={style} className="defaultStyle">
                    <Routing store={store} />
                </div>
            </Provider>
        );
    }
}
