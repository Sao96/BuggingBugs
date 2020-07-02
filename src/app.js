import "./index.css";
import React, { useState, useEffect } from "react";
import { createStore } from "redux";
import { Provider } from "react-redux";
import { combinedReducer } from "reducers/combinedreducer.js";
import { Routing } from "./routing";
import { endpoints as ep } from "apiRoutes/BuggingBugs";
import { sharedActions as sA } from "actions/sharedactions.js";
import { MainNavbar } from "util/components/navbars/MainNavbar";

async function initializeApp(setInitialized, store) {
    const res = await fetch(ep.amilogged, {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
            "Cache-Control": "no-cache",
        },
        credentials: "include",
        mode: "cors",
        cache: "no-cache",
        redirect: "follow",
    });
    const resData = await res.json();
    store.dispatch({
        type: sA.SET_LOGGED_IN,
        loggedIn: resData.loggedIn,
    });
    store.dispatch({
        type: sA.SET_USER_DATA,
        userData: {
            uid: resData.uid,
            name: resData.name,
            email: resData.email,
            pfp: resData.pfp,
        },
    });
    setInitialized(true);
}

function App(props) {
    const [initialized, setInitialized] = useState(false);
    const [store, setStore] = useState(createStore(combinedReducer));

    useEffect(() => {
        initializeApp(setInitialized, store);
    }, []);

    if (initialized) {
        return (
            <Provider store={store}>
                <Routing store={store} />
            </Provider>
        );
    } else {
        return <></>;
    }
}

export { App };
