import React, { createRef, Component, useState } from "react";
import Ticket from "./pins/ticket.jsx";
import * as sample from "../samples.jsx";
import Modal from "../components/modal.jsx";
import TicketForm from "./pages/ticketform.jsx";
import Button from "./Button.jsx";
import { connect } from "react-redux";
import actions from "../reduxitems/actions.js";

function FilterOptions(props) {
    function Choices(props) {
        const choicesStyles = {
            display: "flex",
            flexDirection: "column",
        };
        return (
            <div style={choicesStyles}>
                <input type="checkbox"></input>
                <input type="checkbox"></input>
                <input type="checkbox"></input>
                <input type="checkbox"></input>
            </div>
        );
    }
    const filterStyles = {
        backgroundColor: "gray",
        display: "none",
    };

    const handleDisplayClick = (e) => {
        if (!isActive) {
            isActive = true;
        }
    };

    const [isActive, setActive] = useState(false);
    return (
        <div>
            <Button backgroundColor={"rgb(10, 20, 31)"} />
            <div style={filterStyles}>
                <Choices />
            </div>
        </div>
    );
}

function mapStateToProps(state) {
    return {
        modalOpen: state.MODAL_ACTIVE,
    };
}

class TicketBoard extends Component {
    constructor(props) {
        super(props);
        this.state = { modalOpen: false };
        this.ticketClickHandler = this.ticketClickHandler.bind(this);
        this.modalRef = createRef();
        this.modalClickHandler = this.outsideTicketClickHandler.bind(this);
    }

    ticketClickHandler(e) {
        this.props.dispatch({ type: actions.MODAL_ACTIVE });
        console.log(this.props.store.getState());
        document.addEventListener("mousedown", this.modalClickHandler);
    }

    outsideTicketClickHandler(e) {
        console.log(this.props.store.getState());
        if (!this.modalRef.current.contains(e.target)) {
            this.props.dispatch({ type: actions.MODAL_ACTIVE });
            document.removeEventListener("mousedown", this.modalClickHandler);
        }
    }

    randomTickets(n) {
        let res = [];
        let samples = ["a", "b", "c", "d"];
        for (let a = 0; a < n; ++a) {
            res.push(sample[samples[Math.floor(Math.random() * 100) % 4]]);
        }

        console.log(res);
        res.sort((a, b) => {
            if (a.priority < b.priority) {
                return -1;
            } else if (a.priority == b.priority && a.duedate < b.duedate) {
                return -1;
            }
            return 0;
        });

        console.log(res);

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

export default connect(mapStateToProps)(TicketBoard);
