import React, { useCallback, useState, createRef } from "react";
import { domain } from "routes";
import { useHistory, Redirect } from "react-router";
import { ErrorBox } from "util/ErrorBox";
import EditProjectIcon from "svg/editproject.svg";
import Button from "util/Button.jsx";

async function PushRename(toUid, setRes, pid) {
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

function RenameProject(props) {
    const [res, setRes] = useState([-1, ""]);
    const newNameRef = createRef();
    const sendProjectNameChangeHandler = useCallback(() => {
        PushRename(newNameRef.current.value, setRes, props.pid);
    }, [newNameRef]);
    const svgStyle = {
        height: "130px",
        width: "130px",
        fill: "rgb(180,180,180)",
    };
    const mainStyle = {
        display: "flex",
        flexWrap: "wrap",
        fontFamily: "didact gothic",
        alignItems: "center",
        flexDirection: "column",
        position: "relative",
        marginTop: "8px",
    };
    return (
        <div style={mainStyle}>
            <ResRender res={res} pid={props.pid} />
            <EditProjectIcon style={svgStyle} />
            Enter the new name of the project.
            <div style={{ marginTop: "10px", marginBottom: "10px" }}>
                <input ref={newNameRef} type="text"></input>
            </div>
            <Button
                onClick={sendProjectNameChangeHandler}
                text={"Rename"}
                backgroundColor="green"
            />
        </div>
    );
}

export { RenameProject };
