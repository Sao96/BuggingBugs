import React, { Component } from "react";
import TicketForm from "./components/pages/ticketform.jsx";
import Sidebar from "./components/sidebar.jsx";
import TicketBoard from "./components/ticketboard.jsx";
import "./index.css";

export default class App extends Component {
  constructor(props) {
    super(props);
    this.helpme = TicketForm;
  }
  TicketWrapper() {
    return <TicketForm {...test} />;
  }

  render() {
    let style = {
      display: "flex",
    };

    return (
      <div className="main" style={style}>
        <Sidebar />
        <TicketBoard />
      </div>
    );
  }
}
