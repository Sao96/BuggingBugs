import React, { createRef, useState } from "react";
import AddAttachmentButtonIcon from "svg/AddAttachment.svg";
import ProjectBoard from "./components/ProjectBoard/projectboard.jsx";
import { dashboardActions } from "actions/dashboardactions.js";
import { sharedActions } from "actions/sharedactions.js";
import { useSelector, useDispatch } from "react-redux";
import Modal from "util/modal.jsx";
import ModalCreateProject from "./components/ModalCreateProject/modalcreateproject.jsx";
import ModalJoinProject from "./components/ModalJoinProject/modaljoinproject.jsx";

function Dashboard(props) {
    const modalRef = createRef();
    // const [modalState, setModalState] = useState(0);
    const dispatch = useDispatch();
    const selector = (field) => {
        return useSelector((state) => {
            return state[field];
        });
    };
    const launchModalHandler = () => {
        dispatch({ type: sharedActions.MODAL_STATE, modalState: 1 });
    };

    const mainStyle = {
        color: "white",
        display: "flex",
        flexWrap: "wrap",
        alignItems: "center",
    };
    const addAttachmentButtonStyle = {
        height: "100px",
        width: "100px",
        fill: "white",
        paddingLeft: "10px",
        cursor: "pointer",
    };

    return (
        <main style={mainStyle}>
            <ProjectBoard />
            <AddAttachmentButtonIcon
                style={addAttachmentButtonStyle}
                onClick={launchModalHandler}
            />
            <Modal
                assignedRef={modalRef}
                isOpen={selector(sharedActions.modalState)}
            >
                {/* <ModalCreateProject /> */}
                <ModalJoinProject />
            </Modal>
        </main>
    );
}

export default Dashboard;
