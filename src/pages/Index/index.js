import React from "react";
import { useSelector } from "react-redux";
import { Redirect } from "react-router-dom";
import { sharedFields as sF } from "fields/sharedfields";
import { navRoutes } from "navRoutes";

function Index(props) {
    const loggedIn = useSelector((state) => {
        return state.shared[sF.LOGGED_IN];
    });
    if (loggedIn) {
        return <Redirect to={navRoutes.dashboard} />;
    }

    return <Redirect to={navRoutes.landing} />;
}

export { Index };
