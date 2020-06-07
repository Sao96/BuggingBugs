import React, { createRef, useCallback } from "react";
import Button from "util/Button.jsx";
import CreateGroupIcon from "svg/create.svg";
import { domain } from "routes";
const pushProject = async (projNameRef) => {
    var headers = new Headers();
    const data = {
        projectName: projNameRef.current.value,
    };
    headers.append("Content-Type", "application/json");
    headers.append("Accept", "application/json");
    const endpoint = domain + "createproject";
    const res = await fetch(endpoint, {
        method: "POST",
        headers: headers,
        credentials: "include",
        mode: "cors",
        cache: "no-cache",
        redirect: "follow",
        body: JSON.stringify(data),
    });
};

function ModalCreateProject(props) {
    const mainStyle = {
        display: "flex",
        flexWrap: "wrap",
        fontFamily: "didact gothic",
        alignItems: "center",
        flexDirection: "column",
        position: "relative",
    };
    const createGroupSvgStyle = {
        height: "130px",
        width: "130px",
        fill: "rgb(180,180,180)",
    };
    const projNameRef = createRef();
    const createClickHandler = useCallback(() => {
        pushProject(projNameRef);
    }, [projNameRef]);
    return (
        <div style={mainStyle}>
            <CreateGroupIcon style={createGroupSvgStyle} />
            Enter the name of your new BuggingBugs application:
            <div style={{ marginTop: "10px", marginBottom: "10px" }}>
                <input ref={projNameRef} type="text" name="fname"></input>
            </div>
            <Button
                onClick={createClickHandler}
                text={"Create"}
                backgroundColor="green"
            />
        </div>
    );
}

export default ModalCreateProject;
