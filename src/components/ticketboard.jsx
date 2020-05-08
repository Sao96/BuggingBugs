import React, { createRef, Component } from "react";
import Ticket from "./pins/ticket.jsx";
import * as sample from "../samples.jsx";
import Modal from "../components/modal.jsx";
import TicketForm from "./pages/ticketform.jsx";

export default class TicketBoard extends Component {
  constructor(props) {
    super(props);
    this.state = { modalOpen: false };
    this.ticketClickHandler = this.ticketClickHandler.bind(this);
    this.modalRef = createRef();
    this.modalClickHandler = this.outsideTicketClickHandler.bind(this);
  }

  ticketClickHandler(e) {
    this.setState({ isTicketOpen: true });
    document.addEventListener("mousedown", this.modalClickHandler);
  }

  outsideTicketClickHandler(e) {
    if (!this.modalRef.current.contains(e.target)) {
      this.setState({ isTicketOpen: false });
      document.removeEventListener("mousedown", this.modalClickHandler);
    }
  }

  randomTickets(n) {
    let res = [];
    let samples = [
      <Ticket boardHandler={this.ticketClickHandler} {...sample.a} />,
      <Ticket boardHandler={this.ticketClickHandler} {...sample.b} />,
      <Ticket boardHandler={this.ticketClickHandler} {...sample.c} />,
      <Ticket boardHandler={this.ticketClickHandler} {...sample.d} />,
    ];
    for (let a = 0; a < n; ++a) {
      res.push(samples[Math.floor(Math.random() * 100) % 4]);
    }

    return res;
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
        <Modal assignedRef={this.modalRef} isOpen={this.state.isTicketOpen}>
          <TicketForm {...test} />
        </Modal>
        <div style={boardStyle}>{this.randomTickets(100)}</div>
      </div>
    );
  }
}
