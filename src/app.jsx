import React, { Component } from "react";
import Sidebar from "./components/sidebar.jsx";
import Ticket from "./components/pins/ticket.jsx";
import "./index.css";

export default class App extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    const ticketProps = {
      pfp: "https://i.imgur.com/JBQcxgY.png",
      author: "Scott Combs",
      priority: 1,
      status: 1,
      duedate: "5/20",
    };

    return (
      <div class="main">
        {/* <Sidebar /> */}
        {/* <Sidebar></Sidebar> */}
        <Ticket {...ticketProps} />
        <Ticket {...ticketProps} />
        <Ticket {...ticketProps} />
      </div>
    );
  }
}
