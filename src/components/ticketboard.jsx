import React, { createRef, Component, useState } from "react";
import Ticket from "./pins/ticket.jsx";
import * as sample from "../samples.jsx";
import Modal from "../components/modal.jsx";
import TicketForm from "./pages/ticketform.jsx";
import Button from "./Button.jsx";
import { connect, useSelector, useDispatch } from "react-redux";
import actions from "../reduxitems/actions.js";

let x;
function ChoicesBox(props) {
    const choicesStyles = {
        display: "flex",
        color: "white",
        fontFamily: "Didact Gothic, Quattrocento Sans",
    };
    const headerStyle = {
        color: "rgb(203, 234, 244)",
        fontSize: "22px",
        fontFamily: "Didact Gothic, Quattrocento Sans",
    };
    const boxItemStyle = {
        marginRight: "10px",
    };

    const selector = (TARGET_FILTER) => {
        useSelector((state) => {
            return state[TARGET_FILTER];
        });
    };
    const filterOptions = [
        ["Open", actions.FILTER_TS_OPEN],
        ["In Progress", actions.FILTER_TS_IN_PROGRESS],
        ["Pending Approval", actions.FILTER_TS_PENDING_APPROVAL],
        ["Closed", actions.FILTER_TS_CLOSED],
    ];
    const dispatch = useDispatch();

    const alertStore = (action) => {
        dispatch({ type: action });
    };
    const inputBoxes = filterOptions.map((field) => {
        return (
            <label style={boxItemStyle}>
                <input
                    type="checkbox"
                    onClick={alertStore.bind(null, field[1])}
                    checked={selector(field[1])}
                ></input>
                {field[0]}
            </label>
        );
    });

    return (
        <div>
            <div style={headerStyle}>Ticket Status</div>
            <div style={choicesStyles}>{inputBoxes}</div>
        </div>
    );
}

function FilterOptions(props) {
    const filterMenuOpen = useSelector((state) => {
        return state.DISPLAY_SEARCH_FILTER;
    });

    const dispatch = useDispatch();

    const filterStyles = {
        backgroundColor: "rgb(10, 20, 31)",
        padding: "20px",
        display: filterMenuOpen ? "inline-block" : "none",
        margin: "5px 0px",
    };

    const handleDisplayClick = (e) => {
        dispatch({ type: actions.DISPLAY_SEARCH_FILTER });
    };

    return (
        <div>
            <div>
                <Button
                    onClick={handleDisplayClick}
                    backgroundColor={"rgb(10, 20, 31)"}
                    text={filterMenuOpen ? "Hide Filters" : "Open Filters"}
                />
            </div>
            <div style={filterStyles}>
                <ChoicesBox />
            </div>
        </div>
    );
}

class TicketBoard extends Component {
    constructor(props) {
        super(props);
        this.state = { modalOpen: false };
        this.ticketClickHandler = this.ticketClickHandler.bind(this);
        this.modalRef = createRef();
        this.modalClickHandler = this.outsideTicketClickHandler.bind(this);
        x = props.store;
    }

    ticketClickHandler(e) {
        this.props.dispatch({ type: actions.MODAL_ACTIVE });

        document.addEventListener("mousedown", this.modalClickHandler);
    }

    outsideTicketClickHandler(e) {
        if (!this.modalRef.current.contains(e.target)) {
            this.props.dispatch({ type: actions.MODAL_ACTIVE });
            document.removeEventListener("mousedown", this.modalClickHandler);
        }
    }

    randomTickets(n) {
        let res = [...sample.premade];
        const mapPirorityToStore = {
            0: this.props.filterOpen,
            1: this.props.filterInProgress,
            2: this.props.filterPendingApproval,
            3: this.props.filterClosed,
        };
        const filterActive = ((filterVals) => {
            for (status in filterVals) {
                if (filterVals[status]) return true;
            }
            return false;
        })(mapPirorityToStore);
        if (filterActive) {
            res = res.filter((ticket) => {
                return mapPirorityToStore[ticket.status];
            });
        }

        res.sort((a, b) => {
            if (a.priority < b.priority) {
                return -1;
            } else if (a.priority == b.priority && a.duedate < b.duedate) {
                return -1;
            }
            return 0;
        });

        return res.map((card) => {
            return <Ticket boardHandler={this.ticketClickHandler} {...card} />;
        });
    }

    render() {
        const boardStyle = {
            display: "flex",
            flexWrap: "wrap",
            justifyContent: "center",
        };

        const test = {
            headline: "Vanguard system is broken",
            priority: "High",
            environment: "Windows 10 v10.5.2, Google Chrome v10.2",
            tags: "React",
            time: "8:30",
            dueTime: "10/12",
            summary:
                "Display photos on the home feed get mixed with other users, homepage displays random photo's from the internet. Display photos on the home feed get mixed with other users, homepage displays random photo's from the internet.",
        };

        return (
            <div>
                <Modal
                    assignedRef={this.modalRef}
                    isOpen={this.state.isTicketOpen}
                >
                    <TicketForm {...test} />
                </Modal>
                <FilterOptions />
                <div style={boardStyle}>{this.randomTickets(10)}</div>
            </div>
        );
    }
}

const mapStateToTicketBoardProps = (state) => {
    return {
        modalOpen: state.MODAL_ACTIVE,
        filterOpen: state.FILTER_TS_OPEN,
        filterInProgress: state.FILTER_TS_IN_PROGRESS,
        filterPendingApproval: state.FILTER_TS_PENDING_APPROVAL,
        filterClosed: state.filterClosed,
    };
};

export default connect(mapStateToTicketBoardProps)(TicketBoard);
