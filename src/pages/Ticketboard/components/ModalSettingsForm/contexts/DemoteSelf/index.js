import React, { useState } from "react";
import DemoteIcon from "svg/demote.svg";
import Button from "util/Button.jsx";

async function PushUserDemote(toUid, setRes, pid) {
    const data = {
        to: toUid,
    };

    var headers = new Headers();
    headers.append("Content-Type", "application/json");
    headers.append("Accept", "application/json");
    const endpoint = domain + "createinvite?pid=" + pid; //subject to change
    const res = await fetch(endpoint, {
        method: "POST",
        headers: headers,
        credentials: "include",
        mode: "cors",
        cache: "no-cache",
        redirect: "follow",
        body: JSON.stringify(data),
    });
    const resStatus = res.status,
        resData = await res.json();
    setRes([resStatus, resData]);
}

const ResRender = (props) => {
    const res = props.res;
    const pid = props.pid;
    switch (res[0]) {
        case 200:
            useHistory().go(); //say invite sent or something
        case 300:
            return <Redirect to={"/login"} />;
        case 400:
            return <ErrorBox text={res[1]} />;
        case 500:
            return <ErrorBox text={res[1]} />;
        default:
            return <></>;
    }
};

function DemoteSelf(props) {
    const [res, setRes] = useState([-1, ""]);
    const svgStyle = {
        height: "130px",
        width: "130px",
        fill: "rgb(180,180,180)",
        position: "relative",
        top: "10px",
    };
    const mainStyle = {
        display: "flex",
        flexWrap: "wrap",
        fontFamily: "didact gothic",
        alignItems: "center",
        flexDirection: "column",
        position: "relative",
    };
    return (
        <div style={mainStyle}>
            <ResRender res={res} pid={props.pid} />
            <DemoteIcon style={svgStyle} />
            <div style={{ paddingLeft: "20px" }}>
                Are you sure you would like to demote yourself? This cannot be
                undone.
            </div>
            <div style={{ marginTop: "10px", marginBottom: "10px" }}>
                <Button
                    // onClick={sendUserRemoval}
                    text={"Demote"}
                    backgroundColor="green"
                />
            </div>
        </div>
    );
}
export { DemoteSelf };
