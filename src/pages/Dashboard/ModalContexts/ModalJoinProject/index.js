import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { dashboardActions } from "actions/dashboardactions.js";
import { dashboardFields } from "fields/dashboardfields.js";
import { getGetInvites } from "apiCalls/BuggingBugs/GET";
import { ResRender, InviteList } from "./components";
import { SpinningLoader } from "util/components/loading";

function ModalJoinProject(props) {
    const dispatch = useDispatch();
    const [res, setRes] = useState([-1, ""]);
    const [invitesLoading, setInvitesLoading] = useState(true);
    const invites = useSelector((state) => {
        return state.dashboard[dashboardFields.INVITES];
    });
    useEffect(() => {
        getGetInvites(setRes, setInvitesLoading, dispatch);
        return () => {
            dispatch({ type: dashboardActions.SET_PROJECTS_MODIFIED });
        };
    }, [dispatch]);

    const RenderedInvites =
        res[0] !== -1 ? <InviteList invites={invites} /> : <></>;
    const containerStyle = {
        display: "flex",
        flexWrap: "wrap",
        fontFamily: "didact gothic",
        alignItems: "center",
        flexDirection: "column",
        position: "relative",
    };

    return (
        <div style={containerStyle}>
            <ResRender res={res} />
            <SpinningLoader loading={invitesLoading} />
            {RenderedInvites}
        </div>
    );
}

export { ModalJoinProject };
