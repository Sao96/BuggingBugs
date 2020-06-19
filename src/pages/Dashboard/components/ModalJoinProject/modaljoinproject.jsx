import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import InviteIcon from "svg/invite2.svg";
import Button from "util/Button.jsx";
import { InviteList } from "./components/InviteList";
import { ErrorBox } from "util/ErrorBox";
import ClipLoader from "react-spinners/ClipLoader";
import { domain } from "routes";
import { dashboardActions } from "actions/dashboardactions.js";
import { dashboardFields } from "fields/dashboardfields.js";

const getInvites = async (dispatch) => {
    var headers = new Headers();
    headers.append("Content-Type", "application/json");
    headers.append("Accept", "application/json");
    const endpoint = domain + "getinvites";
    const res = await fetch(endpoint, {
        method: "GET",
        headers: headers,
        credentials: "include",
        mode: "cors",
        cache: "no-cache",
        redirect: "follow",
    });
    const resStatus = res.status,
        resData = await res.json();

    dispatch({
        type: dashboardActions.SET_INVITES,
        invites: resData.invites,
        resStatus: resStatus,
    });
};

const ResRender = (props) => {
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
            return <ErrorBox text={res[1]} />;
        case 500:
            return <ErrorBox text={res[1]} />;
        default:
            return <ErrorBox text={"An internal error has occured."} />;
    }
};

function ModalJoinProject(props) {
    const dispatch = useDispatch();
    const res = useSelector((state) => {
        return [
            state.dashboard[dashboardFields.INVITES],
            state.dashboard[dashboardFields.RES_STATUS],
        ];
    });
    useEffect(() => {
        getInvites(dispatch);
        return () => {
            dispatch({ type: dashboardActions.RESET_INVITES_STATE });
            dispatch({ type: dashboardActions.SET_PROJECTS_MODIFIED });
        };
    }, []);
    const mainStyle = {
        display: "flex",
        flexWrap: "wrap",
        fontFamily: "didact gothic",
        alignItems: "center",
        flexDirection: "column",
        position: "relative",
    };
    const joinGroupSvgStyle = {
        height: "130px",
        width: "130px",
        fill: "rgb(180,180,180)",
    };

    return (
        <div style={mainStyle}>
            <ResRender res={res} />
        </div>
    );
}

export default ModalJoinProject;
