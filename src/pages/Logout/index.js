import React from "react";
import { Redirect } from "react-router-dom";
import { domain } from "routes/";
const destroySession = () => {};

function DestroySession() {
    var headers = new Headers();
    headers.append("Content-Type", "application/json");
    headers.append("Accept", "application/json");
    const endpoint = domain + "/logout";
    fetch(endpoint, {
        method: "POST",
        headers: headers,
        credentials: "include",
        mode: "cors",
        cache: "no-cache",
        redirect: "follow",
    }); //THEN get the info to build the cards
}

function Logout(props) {
    DestroySession();
    return <Redirect push to="/" />;
}

export { Logout };
