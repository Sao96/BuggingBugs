import React, { createRef, useState, useCallback, useEffect } from "react";
import Button from "util/Button.jsx";
import CreateGroupIcon from "svg/create.svg";
import { domain } from "routes";
import { useDispatch } from "react-redux";
import { dashboardActions } from "actions/dashboardactions";
import ClipLoader from "react-spinners/ClipLoader";
import { ErrorBox } from "util/ErrorBox";
import { SuccessBox } from "util/SuccessBox";

const pushProject = async (projNameRef, setProcessing, setRes) => {
    setProcessing(true);
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
    setProcessing(false);
    const resStatus = res.status,
        resData = await res.json();
    setRes([resData, resStatus]);
};

const ResRender = (props) => {
    const res = props.res;

    const pid = props.pid;
    switch (res[1]) {
        case -1: //set loading
            return <> </>;
        case 200:
            return <SuccessBox text={res[0].message} />;
        case 300:
            return <Redirect push to={"/login"} />;
        case 400:
            return <ErrorBox text={res[0]} />;
        default:
            return <ErrorBox text={"An internal error has occured."} />;
    }
};

const CreateButton = (props) => {
    const processing = props.processing;
    const createClickHandler = props.clickHandler;
    if (!processing) {
        return (
            <Button
                onClick={createClickHandler}
                text={"Create"}
                backgroundColor="green"
            />
        );
    }
    return <ClipLoader size={150} color={"rgb(200,200,200)"} loading={true} />;
};

function ModalCreateProject(props) {
    const [processing, setProcessing] = useState(false);
    const [res, setRes] = useState(["", -1]);
    const dispatch = useDispatch();
    useEffect(() => {
        return () => {
            dispatch({ type: dashboardActions.SET_PROJECTS_MODIFIED });
        };
    }, []);
    const projNameRef = createRef();
    const createClickHandler = useCallback(() => {
        pushProject(projNameRef, setProcessing, setRes);
    }, [projNameRef, setProcessing, setRes]);

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
    return (
        <div style={mainStyle}>
            <ResRender res={res} />
            <CreateGroupIcon style={createGroupSvgStyle} />
            Enter the name of your new BuggingBugs application:
            <div style={{ marginTop: "10px", marginBottom: "10px" }}>
                <input ref={projNameRef} type="text" name="fname"></input>
            </div>
            <CreateButton
                processing={processing}
                clickHandler={createClickHandler}
            />
        </div>
    );
}

export default ModalCreateProject;
