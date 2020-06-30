import React, { createRef, useState, useEffect } from "react";
import { TicketDisplayer } from "./components";
import { useSelector, useDispatch } from "react-redux";
import { Modal } from "modal";
import {
    ModalTicketForm,
    ModalCreateTicketForm,
    ModalEditTicketForm,
    ModalCreateInviteForm,
    ModalSettingsForm,
} from "./ModalContexts";
import { sharedActions } from "actions/sharedactions.js";
import { sharedFields } from "fields/sharedfields.js";
import { ticketboardActions } from "actions/ticketboardactions";
import { ticketboardFields } from "fields/ticketboardfields";
import { Toolbar } from "./components/Toolbar";
import { getLoadProject } from "apiCalls/BuggingBugs/GET";
import { SpinningLoader } from "util/components/loading";

function TicketBoard(props) {
    const dispatch = useDispatch();
    const [ticketsLoading, setTicketsLoading] = useState(true);
    const [res, setRes] = useState([-1, ""]);
    const modalRef = createRef();
    const query = new URLSearchParams(props.location.search);
    const pid = query.get("pid");
    const [
        users,
        tickets,
        authLevel,
        refreshNeeded,
        currModalStack,
    ] = useSelector((state) => {
        return [
            state.ticketboard[ticketboardFields.USERS],
            state.ticketboard[ticketboardFields.TICKETS],
            state.ticketboard[ticketboardFields.AUTH_LEVEL],
            state.ticketboard[ticketboardFields.REFRESH_NEEDED],
            state.shared[sharedFields.MODAL_STACK],
        ];
    });
    useEffect(() => {
        dispatch({ type: ticketboardActions.SET_PID, pid: pid });
        dispatch({ type: sharedActions.TOGGLE_NAV });
        return () => {
            dispatch({ type: sharedActions.TOGGLE_NAV });
            dispatch({ type: sharedActions.EMPTY_MODAL_STACK });
            dispatch({ type: ticketboardActions.FLUSH_TICKETBOARD_STATE });
        };
    }, []);
    useEffect(() => {
        getLoadProject(pid, setRes, setTicketsLoading, dispatch);
    }, [refreshNeeded]);

    const currModalContext = () => {
        switch (currModalStack[currModalStack.length - 1]) {
            case 1:
                return <ModalTicketForm />;
            case 2:
                return <ModalCreateTicketForm users={users} pid={pid} />;
            case 3:
                return <ModalEditTicketForm users={users} pid={pid} />;
            case 4:
                return <ModalCreateInviteForm pid={pid} />;
            case 5:
                return <ModalSettingsForm />;
        }
    };
    const containerStyle = {
        color: "white",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        width: "100%",
    };
    const loaderStyle = {
        position: "fixed",
        top: "200px",
        left: "50%",
    };

    return (
        <article style={containerStyle}>
            <Modal assignedRef={modalRef}>{currModalContext()}</Modal>
            <Toolbar />
            <main>
                <TicketDisplayer
                    tickets={tickets}
                    users={users}
                    pid={pid}
                    authLevel={authLevel}
                />
            </main>
            <SpinningLoader style={loaderStyle} loading={ticketsLoading} />
        </article>
    );
}

export { TicketBoard };
