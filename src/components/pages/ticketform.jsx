import React, { Component } from "react";

function attachment(props) {
  //pic, name, attachment
}

function comment() {}

export default class TicketForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      headline: props.headline,
      priority: props.priority,
      environment: props.environment,
      tags: props.tags,
      time: props.time,
      dueTime: props.dueTime,
      summary: props.summary,
    };
  }

  TicketInfoSection() {
    const concern = {
      border: "1px solid #999",
      borderCollapse: "collapse",
      fontStyle: "",
      fontFamily: "Didact Gothic, Quattrocento Sans",
      justifyContent: "center",
    };
    return (
      <table style={concern}>
        <tr>
          <td style={concern}>Priority</td>
          <td>{this.state.priority}</td>
        </tr>
        <tr>
          <td>Due</td>
          <td>{this.state.dueTime}</td>
        </tr>
        <tr>
          <td>Time</td>
          <td>{this.state.time}</td>
        </tr>
        <tr>
          <td>Tags</td>
          <td>{this.state.tags}</td>
        </tr>
        <tr>
          <td>Environment</td>
          <td>{this.state.environment}</td>
        </tr>
        <tr>
          <td>Sumarry</td>
          <td>{this.state.summary}</td>
        </tr>
      </table>
    );
  }

  AttachmentsSection() {
    // return <div>fill me later</div>;
  }

  DiscussionSection() {
    // return <div>fill me later</div>;
  }

  render() {
    return (
      <div style={{ backgroundColor: "white" }}>{this.TicketInfoSection()}</div>
    );
  }
}
