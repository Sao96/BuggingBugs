import React, { Component, useState, useEffect } from "react";
import Sidebar from "./util/sidebar.jsx";
import { createStore } from "redux";
import { Provider } from "react-redux";
import { combinedReducer } from "reducers/combinedreducer.js";
import "./index.css";
import { Navbar } from "util/navbar.jsx";
import { Routing } from "./routing.jsx";
import { domain } from "./routes";
import { sharedActions } from "actions/sharedactions.js";
import "babel-polyfill";

async function initializePage(setApp) {
    var headers = new Headers();
    headers.append("Content-Type", "application/json");
    headers.append("Accept", "application/json");
    const endpoint = domain + "amilogged";
    const res = await fetch(endpoint, {
        method: "GET",
        headers: headers,
        credentials: "include",
        mode: "cors",
        cache: "no-cache",
        redirect: "follow",
    }); //THEN get the info to build the cards
    const dbRes = await res.json();
    const store = createStore(combinedReducer);
    store.dispatch({
        type: sharedActions.SET_LOGGED_IN,
        loggedIn: dbRes.loggedIn,
    });
    let style = {
        display: "flex",
        position: "relative",
    };
    setApp(
        <Provider store={store}>
            <div className="main" style={style} className="defaultStyle">
                <Routing store={store} />
            </div>
        </Provider>
    );
}

function App(props) {
    const [app, setApp] = useState(<div></div>);
    useEffect(() => {
        initializePage(setApp);
    }, []);

    return <div>{app}</div>;
}

export { App };
