import React, { createRef, Component } from "react";
import Ticket from "./pins/ticket.jsx";
import * as sample from "../samples.jsx";
import Modal from "../components/modal.jsx";

export default class TicketBoard extends Component {
  constructor(props) {
    super(props);
    this.state = { modalOpen: false };
    console.log("the state:", this.state);
    this.ticketClickHandler = this.ticketClickHandler.bind(this);
    this.modalRef = createRef();
    this.modalClickHandler = this.outsideTicketClickHandler.bind(this);
  }

  ticketClickHandler(e) {
    console.log(e);
    console.log(this.state);
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

    return (
      <div>
        <Modal assignedRef={this.modalRef} isOpen={this.state.isTicketOpen} />
        <div style={boardStyle}>{this.randomTickets(100)}</div>
      </div>
    );
  }
}
