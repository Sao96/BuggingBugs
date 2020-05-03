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
      pfp: "https://i.imgur.com/lbrVhd3.png",
      author: "Scott Combs",
      priority: 0,
      status: 1,
      duedate: "5/20",
      summary:
        "Strings sent to website end up being corrupted when displayed afterward. Text too close to borders.",
    };
    const ticketProps2 = {
      pfp:
        "https://i.pinimg.com/474x/a9/54/78/a95478bbf2d5520fae91a9b95e321122.jpg",
      author: "Andrew Williams",
      priority: 1,
      status: 1,
      duedate: "5/21",
      summary:
        "Vanguard system causes the entire system to enter a deadlock state. Harddrive must be formatted for system to run back on.",
    };

    const ticketProps3 = {
      pfp: "https://i.imgur.com/poZr1ed.png",
      author: "James Jones",
      priority: 2,
      status: 1,
      duedate: "5/24",
      summary:
        "Display photos on the home feed get mixed with other users, homepage displays random photo's from the internet.",
    };

    const ticketProps4 = {
      pfp: "https://i.imgur.com/aIBs6cj.png",
      author: "Michael Toms",
      priority: 3,
      status: 1,
      duedate: "5/25",
      summary:
        "Display photos on the home feed get mixed with other users, homepage displays random photo's from the internet.",
    };

    return (
      <div class="main">
        <Ticket {...ticketProps} status={0} />
        <Ticket {...ticketProps2} status={1} />
        <Ticket {...ticketProps3} status={2} />
        <Ticket {...ticketProps4} status={1} />
      </div>
    );
  }
}
