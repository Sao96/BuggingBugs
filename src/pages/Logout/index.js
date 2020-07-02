import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { sharedActions as sA } from "actions/sharedactions";
import { Redirect } from "react-router-dom";
import { SpinningLoader } from "util/components/loading";
import { postDestroySession } from "apiCalls/BuggingBugs/POST";

function Logout(props) {
    const dispatch = useDispatch();
    const [processing, setProcessing] = useState(true);
    useEffect(() => {
        postDestroySession(setProcessing);
    }, []);

    if (!processing) {
        dispatch({ type: sA.DESTROY_SESSION });
        return <Redirect push to="/" />;
    }

    const containerStyle = {
        position: "fixed",
        top: "20%",
        display: "flex",
        width: "100%",
        flexDirection: "column",
        alignItems: "center",
    };
    const textStyle = {
        fontFamily: "Didact Gothic",
        fontSize: "30px",
        color: "white",
    };

    return (
        <div style={containerStyle}>
            <SpinningLoader loading={true} />
            <span style={{ marginBottom: "30px" }} />
            <div style={textStyle}>Ending session and logging you out...</div>
        </div>
    );
}

export { Logout };
