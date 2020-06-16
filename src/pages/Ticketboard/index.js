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

const loadProject = async (dispatch, pid) => {
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
    }); //THEN get the info to build the cards
    const dbData = await res.json();
    dispatch({ type: ticketboardActions.SET_USERS, users: dbData.users });
    dispatch({ type: ticketboardActions.SET_TICKETS, tickets: dbData.tickets });
    // setUsers(dbData.users);
};

function TicketBoard(props) {
    const modalRef = createRef();
    const dispatch = useDispatch();
    const query = new URLSearchParams(props.location.search);
    const pid = query.get("pid");
    const selector = (key, field) => {
        return useSelector((state) => {
            return state[key][field];
        });
    };
    const users = useSelector((state) => {
        return state.ticketboard[ticketboardFields.USERS];
    });
    const tickets = useSelector((state) => {
        return state.ticketboard[ticketboardFields.TICKETS];
    });
    // const [users, setUsers] = useState([]);

    useEffect(() => {
        loadProject(dispatch, pid);
        return () => {
            dispatch({ type: sharedActions.EMPTY_MODAL_STACK });
        };
    }, []);

    const ticketClickHandler = () => {
        dispatch({ type: sharedActions.PUSH_MODAL_STATE, modalState: 1 });
    };
    const createTicketClickHandler = () => {
        dispatch({ type: sharedActions.PUSH_MODAL_STATE, modalState: 2 });
    };
    const createInviteHandler = () => {
        dispatch({ type: sharedActions.PUSH_MODAL_STATE, modalState: 4 });
    };
    const launchSettingsHandler = () => {
        dispatch({ type: sharedActions.PUSH_MODAL_STATE, modalState: 5 });
    };

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
    };
    const buttonLayout = {
        display: "flex",
        marginBottom: "5px",
    };
    const buttonSpacing = {
        marginRight: "10px",
    };

    return (
        <main style={mainStyle}>
            <div style={buttonLayout}>
                <div style={buttonSpacing}>
                    <Button
                        text={"Settings"}
                        backgroundColor="rgb(0,20,150)"
                        onClick={launchSettingsHandler}
                    />
                </div>
                <div style={buttonSpacing}>
                    <Button
                        text={"Create Ticket"}
                        backgroundColor="green"
                        onClick={createTicketClickHandler}
                    />
                </div>
                <div style={buttonSpacing}>
                    <Button
                        text={"Invite User"}
                        backgroundColor={"rgb(10, 20, 31)"}
                        onClick={createInviteHandler}
                    />
                </div>
                <div style={buttonSpacing}>
                    <Filter />
                </div>
            </div>
            <TicketDisplayer tickets={tickets} users={users} pid={pid} />
            <Modal assignedRef={modalRef}>{currModalContext()}</Modal>
        </main>
    );
}

export { TicketBoard };
