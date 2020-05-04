import React, { Component } from "react";
import Sidebar from "./components/sidebar.jsx";
import Ticket from "./components/pins/ticket.jsx";
import TicketBoard from "./components/ticketboard.jsx";
import "./index.css";

export default class App extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    let style = {
      display: "flex",
    };

    const kek = (e) => {
      print(e);
    };

    return (
      <div className="main" style={style}>
        <Sidebar style={{ backgroundColor: "blue" }} />
        <TicketBoard />
      </div>
    );
  }
}
