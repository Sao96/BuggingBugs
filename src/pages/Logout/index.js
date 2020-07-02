import React, { useEffect, useState } from "react";
import { Redirect } from "react-router-dom";
import { SpinningLoader } from "util/components/loading";
import { postDestroySession } from "apiCalls/BuggingBugs/POST";

function Logout(props) {
    const [processing, setProcessing] = useState(true);
    useEffect(() => {
        postDestroySession(setProcessing);
    }, []);

    if (!processing) {
        return <Redirect push to="/" />;
    }

    return <SpinningLoader loading={true} />;
}

export { Logout };
