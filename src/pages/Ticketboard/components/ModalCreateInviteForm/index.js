import React, { useCallback, useState, createRef } from "react";
import { domain } from "routes";
import { useHistory, Redirect } from "react-router";
import { ErrorBox } from "util/ErrorBox";
import InviteUserIcon from "svg/invite2.svg";
import Button from "util/Button.jsx";

async function PushInvite(toUid, setRes, pid) {
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

function ModalCreateInviteForm(props) {
    const [res, setRes] = useState([-1, ""]);
    const toUidInputRef = createRef();
    const sendInviteClickHandler = useCallback(() => {
        PushInvite(toUidInputRef.current.value, setRes, props.pid);
    }, [toUidInputRef]);
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
    };
    return (
        <div style={mainStyle}>
            <ResRender res={res} pid={props.pid} />
            <InviteUserIcon style={svgStyle} />
            Enter the ID of the user to invite.
            <div style={{ marginTop: "10px", marginBottom: "10px" }}>
                <input ref={toUidInputRef} type="text"></input>
            </div>
            <Button
                onClick={sendInviteClickHandler}
                text={"Send Invite"}
                backgroundColor="green"
            />
        </div>
    );
}

export { ModalCreateInviteForm };

// const createGroupSvgStyle = {
//     height: "130px",
//     width: "130px",
//     fill: "rgb(180,180,180)",
// };
// const projNameRef = createRef();
// const createClickHandler = useCallback(() => {
//     pushProject(projNameRef);
// }, [projNameRef]);
// return (
//     <div style={mainStyle}>
//         <CreateGroupIcon style={createGroupSvgStyle} />
//         Enter the name of your new BuggingBugs application:
//         <div style={{ marginTop: "10px", marginBottom: "10px" }}>
//             <input ref={projNameRef} type="text" name="fname"></input>
//         </div>
//         <Button
//             onClick={createClickHandler}
//             text={"Create"}
//             backgroundColor="green"
//         />
//     </div>
