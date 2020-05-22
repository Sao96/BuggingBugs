import React, { createRef } from "react";
import { TicketDisplayer } from "./components/TicketDisplayer/ticketdisplayer.jsx";
import { useSelector, useDispatch } from "react-redux";
import Modal from "util/modal.jsx";
import { sharedActions } from "actions/sharedactions.js";
import { sharedFields } from "fields/sharedfields.js";
import ModalTicketForm from "./components/ModalTicketForm/modalticketform.jsx";
import { Filter } from "./components/Filter/filter.jsx";
function TicketBoard(props) {
    const modalRef = createRef();
    const dispatch = useDispatch();
    const selector = (key, field) => {
        return useSelector((state) => {
            return state[key][field];
        });
    };
    const launchModalHandler = () => {
        dispatch({ type: sharedActions.PUSH_MODAL_STATE, modalState: 0 });
    };
    const currModalContext = () => {
        const currModalStack = selector("shared", sharedFields.MODAL_STACK);
        switch (currModalStack[currModalStack.length - 1]) {
            default:
                return <ModalTicketForm />;
        }
    };
    const mainStyle = {
        color: "white",
    };

    return (
        <div style={mainStyle}>
            <Filter />
            <TicketDisplayer />
            <Modal assignedRef={modalRef}>{currModalContext()}</Modal>
        </div>
    );
}

export { TicketBoard };
