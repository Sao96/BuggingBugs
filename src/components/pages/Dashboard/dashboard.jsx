import React, { Component, createRef } from "react";
import ProjectCard from "./projectcard.jsx";
import AddAttachmentButtonIcon from "../../../../svg/AddAttachment.svg";
import Modal from "../../util/modal.jsx";
import NewProjectForm from "./newprojectform.jsx";
import actions from "../../../reduxitems/actions.js";
import { connect, useSelector, useDispatch } from "react-redux";

class Dashboard extends Component {
    constructor(props) {
        super(props);
        this.modalRef = createRef();
        this.handleNewProjIconClickBind = this.handleNewProjIconClick.bind(
            this
        );
        this.outsideModalClickHandlerBind = this.outsideModalClickHandler.bind(
            this
        );
    }

    handleNewProjIconClick() {
        this.props.dispatch({ type: actions.MODAL_ACTIVE });
        document.addEventListener(
            "mousedown",
            this.outsideModalClickHandlerBind
        );
    }
    outsideModalClickHandler(e) {
        if (!this.modalRef.current.contains(e.target)) {
            this.props.dispatch({ type: actions.MODAL_ACTIVE });
            document.removeEventListener(
                "mousedown",
                this.outsideModalClickHandlerBind
            );
        }
    }

    render() {
        const dashboardStyle = {
            color: "white",
            display: "flex",
            flexWrap: "wrap",
            alignItems: "center",
        };
        return (
            <div style={dashboardStyle}>
                <ProjectCard />
                <ProjectCard />
                <ProjectCard />
                <AddAttachmentButtonIcon
                    style={{
                        height: "100px",
                        width: "100px",
                        fill: "white",
                        paddingLeft: "10px",
                        cursor: "pointer",
                    }}
                    onClick={this.handleNewProjIconClickBind}
                />
                <Modal
                    assignedRef={this.modalRef}
                    isOpen={this.props.MODAL_ACTIVE}
                >
                    <NewProjectForm />
                </Modal>
            </div>
        );
    }
}

const mapStateToDashboardProps = (state) => {
    return {
        modalOpen: state.MODAL_ACTIVE,
    };
};

export default connect(mapStateToDashboardProps)(Dashboard);
