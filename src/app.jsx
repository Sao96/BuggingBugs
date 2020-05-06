import React, { Component } from "react";
import TicketForm from "./components/pages/ticketform.jsx";
import Sidebar from "./components/sidebar.jsx";
import Ticket from "./components/pins/ticket.jsx";
import TicketBoard from "./components/ticketboard.jsx";
import ModalTest from "./components/modal.jsx";
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

    const test = {
      headline: "Vanguard system is broken",
      priority: "High",
      environment: "Windows 10 v10.5.2, Google Chrome v10.2",
      tags: "React",
      time: "8:30",
      dueTime: "10/12",
      summary:
        "It seems everytime we launch the game vanguard breaks our computer.",
    };

    return (
      <div className="main" style={style}>
        <TicketForm {...test} />
        {/* <ModalTest />
        <Sidebar />
        <TicketBoard /> */}
      </div>
    );
  }
}
