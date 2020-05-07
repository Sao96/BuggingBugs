import React, { Component } from "react";

function attachment(props) {
  //pic, name, attachment
}

const sample = {
  pfp: "https://i.imgur.com/aIBs6cj.png",
  name: "Smithy Jones",
  message:
    "Display photos on the home feed get mixed with other users, homepage displays random photo's from the internet. Display photos on the home feed get mixed with other users, homepage displays random photo's from the internet.",
  date: "May 7, 2019, 12:19 PST",
};

const sample2 = {
  pfp: "https://i.imgur.com/aIBs6cj.png",
  name: "Smithy Jones",
  message:
    "Display photos on the home feed get mixed with other users, homepage displays random photo's from the internet. ",
  date: "May 7, 2019, 12:19 PST",
};
function CommentBox(props) {}

function Comment(props) {
  const commentStyle = {
    backgroundColor: "orange",
    paddingLeft: "10px",
  };
  const imgStyle = {
    height: "40px",
    width: "40px",
    borderRadius: "50%",
    borderStyle: "solid",
    borderColor: "black",
    borderWidth: "1px",
    marginRight: "5px",
  };
  return (
    <div style={{ display: "flex" }}>
      <img style={imgStyle} src={props.pfp} />
      <div style={commentStyle}>
        <span style={{ fontSize: "16px", paddingRight: "15px" }}>
          {" "}
          {props.name}
        </span>
        <span style={{ fontSize: "14px" }}>{props.date}</span>
        <div style={{ flexBasis: "100%", height: "5px" }}></div>
        <span
          style={{ position: "relative", display: "flex", flexWrap: "wrap" }}
        >
          {props.message}
        </span>
      </div>
    </div>
  );
}

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
    return <div></div>;
  }

  render() {
    return (
      <div style={{ backgroundColor: "white" }}>
        {this.TicketInfoSection()}
        <h1>Comments</h1>
        <Comment {...sample} />
        <br></br>
        <Comment {...sample2} />
        {this.DiscussionSection()}
      </div>
    );
  }
}
