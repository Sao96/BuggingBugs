import React, { createRef } from "react";
import { TicketDisplayer } from "./components/TicketDisplayer/ticketdisplayer.jsx";
import { useSelector, useDispatch } from "react-redux";
import Modal from "util/modal.jsx";
import { sharedActions } from "actions/sharedactions.js";
import { sharedFields } from "fields/sharedfields.js";
import { ModalTicketForm } from "./components/ModalTicketForm/modalticketform.jsx";
import { Filter } from "./components/Filter/filter.jsx";
import Button from "util/Button.jsx";
import { ModalCreateTicketForm } from "./components/ModalCreateTicketForm/modalcreateticketform.jsx";
function TicketBoard(props) {
    const modalRef = createRef();
    const dispatch = useDispatch();
    const selector = (key, field) => {
        return useSelector((state) => {
            return state[key][field];
        });
    };
    const ticketClickHandler = () => {
        dispatch({ type: sharedActions.PUSH_MODAL_STATE, modalState: 1 });
    };
    const createTicketClickHandler = () => {
        dispatch({ type: sharedActions.PUSH_MODAL_STATE, modalState: 2 });
    };
    const currModalContext = () => {
        const currModalStack = selector("shared", sharedFields.MODAL_STACK);
        switch (currModalStack[currModalStack.length - 1]) {
            case 1:
                return <ModalTicketForm />;
            case 2:
                return <ModalCreateTicketForm />;
        }
    };

    const mainStyle = {
        color: "white",
    };
    const buttonLayout = {
        display: "flex",
        marginBottom: "5px",
    };
    const buttonSpacing = {
        marginRight: "10px",
    };
    return (
        <div style={mainStyle}>
            <div style={buttonLayout}>
                <div style={buttonSpacing}>
                    <Button
                        text={"Create Ticket"}
                        backgroundColor="green"
                        onClick={createTicketClickHandler}
                    />
                </div>
                <div style={buttonSpacing}>
                    <Filter />
                </div>
            </div>
            <TicketDisplayer />
            <Modal assignedRef={modalRef}>{currModalContext()}</Modal>
        </div>
    );
}

export { TicketBoard };
