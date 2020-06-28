import React from "react";
import { ErrorBox } from "responseBoxes";
import ClipLoader from "react-spinners/ClipLoader";
import { InviteList } from "..";

function ResRender(props) {
    const res = props.res;
    switch (res[1]) {
        case -1: //set loading
            return (
                <ClipLoader
                    size={150}
                    color={"rgb(200,200,200)"}
                    loading={true}
                />
            );
        case 200:
            return <InviteList invites={res[0]} />;
        case 300:
            return <Redirect push to={"/login"} />;
        case 400:
        case 500:
            return <ErrorBox text={res[1]} />;
        default:
            return <ErrorBox text={"An internal error has occured."} />;
    }
}

export { ResRender };
