import React, { createRef, useState, useEffect } from "react";
import { TicketDisplayer } from "./components/TicketDisplayer/ticketdisplayer.jsx";
import { useSelector, useDispatch } from "react-redux";
import Modal from "util/modal.jsx";
import { ModalTicketForm } from "./components/ModalTicketForm/";
import { ModalCreateTicketForm } from "./components/ModalCreateTicketForm/";
import { ModalCreateInviteForm } from "./components/ModalCreateInviteForm";
import { ModalEditTicketForm } from "./components/ModalEditTicketForm/";
import { ModalSettingsForm } from "./components/ModalSettingsForm";
import { sharedActions } from "actions/sharedactions.js";
import { sharedFields } from "fields/sharedfields.js";
import { Filter } from "./components/Filter/filter.jsx";
import Button from "util/Button.jsx";
import { domain } from "routes";
import { ticketboardActions } from "actions/ticketboardactions";
import { ticketboardFields } from "fields/ticketboardfields";
import { Toolbar } from "./components/Toolbar";
import ClipLoader from "react-spinners/ClipLoader";

const loadProject = async (dispatch, pid, setTicketsLoading) => {
    setTicketsLoading(true);
    var headers = new Headers();
    headers.append("Content-Type", "application/json");
    headers.append("Accept", "application/json");
    const endpoint = domain + "loadproject?pid=" + pid;
    const res = await fetch(endpoint, {
        method: "GET",
        headers: headers,
        credentials: "include",
        mode: "cors",
        cache: "no-cache",
        redirect: "follow",
    });
    const dbData = await res.json();
    dispatch({
        type: ticketboardActions.SET_TICKETBOARD_INFO,
        uid: dbData.uid,
        users: dbData.users,
        tickets: dbData.tickets,
        authLevel: dbData.authLevel,
    });
    setTicketsLoading(false);
};

const TicketsLoadingDisplay = (props) => {
    if (props.loading) {
        const containerStyle = {
            position: "fixed",
            left: "50%",
            top: "25%",
            zIndex: 1,
        };
        return (
            <div style={containerStyle}>
                <ClipLoader
                    size={150}
                    color={"rgb(200,200,200)"}
                    loading={true}
                />
            </div>
        );
    }

    return <></>;
};

function TicketBoard(props) {
    const refreshNeeded = useSelector((state) => {
        return state.ticketboard[ticketboardFields.REFRESH_NEEDED];
    });
    const [ticketsLoading, setTicketsLoading] = useState(true);
    const modalRef = createRef();
    const dispatch = useDispatch();
    const query = new URLSearchParams(props.location.search);
    const pid = query.get("pid");
    const selector = (key, field) => {
        return useSelector((state) => {
            return state[key][field];
        });
    };
    const [users, tickets, authLevel] = useSelector((state) => {
        return [
            state.ticketboard[ticketboardFields.USERS],
            state.ticketboard[ticketboardFields.TICKETS],
            state.ticketboard[ticketboardFields.AUTH_LEVEL],
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
        loadProject(dispatch, pid, setTicketsLoading);
    }, [refreshNeeded]);

    const currModalContext = () => {
        const currModalStack = selector("shared", sharedFields.MODAL_STACK);
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
                return <ModalSettingsForm />; //probably pass everything to render C:
        }
    };

    const mainStyle = {
        color: "white",
        display: "flex",
        flexDirection: "column",
        alignItems: "flex-start",
        width: "100%",
    };

    return (
        <main style={mainStyle}>
            <Toolbar />
            <TicketsLoadingDisplay loading={ticketsLoading} />
            <TicketDisplayer
                tickets={tickets}
                users={users}
                pid={pid}
                authLevel={authLevel}
            />
            <Modal assignedRef={modalRef}>{currModalContext()}</Modal>
        </main>
    );
}

export { TicketBoard };
