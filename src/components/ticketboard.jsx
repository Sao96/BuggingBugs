import React, { Component } from "react";
import Ticket from "./pins/ticket.jsx";
import * as sample from "../samples.jsx";

export default class TicketBoard extends Component {
  constructor(props) {
    super(props);
  }

  randomTickets(n) {
    let res = [];
    let samples = [
      <Ticket {...sample.a} />,
      <Ticket {...sample.b} />,
      <Ticket {...sample.c} />,
      <Ticket {...sample.d} />,
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
      justifyContent: "left",
    };
    return <div style={boardStyle}>{this.randomTickets(100)}</div>;
  }
}
