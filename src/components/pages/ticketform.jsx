import React, { Component } from "react";

function attachment(props) {
  //pic, name, attachment
}

function TicketInfoTable(props) {
  const concern = {
    border: "1px solid #999",
    borderCollapse: "collapse",
    fontStyle: "",
    fontFamily: "Didact Gothic, Quattrocento Sans",
  };
  return (
    <div>
      <table style={concern}>
        <tr>
          <td style={concern}>Priority</td>
          <td>{props.priority}</td>
        </tr>
        <tr>
          <td>Due</td>
          <td>{props.dueTime}</td>
        </tr>
        <tr>
          <td>Time</td>
          <td>{props.time}</td>
        </tr>
        <tr>
          <td>Tags</td>
          <td>{props.tags}</td>
        </tr>
        <tr>
          <td>Environment</td>
          <td>{props.environment}</td>
        </tr>
        <tr>
          <td>Sumarry</td>
          <td>{props.summary}</td>
        </tr>
      </table>
    </div>
  );
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
  const commentBoxStyle = {
    backgroundColor: "green",
    paddingLeft: "10px",
    paddingTop: "10px",
    position: "relative",
    display: "flex",
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
    <div style={commentBoxStyle}>
      <img style={imgStyle} src={props.pfp} />
      <div style={{ position: "relative", left: "10px" }}>
        <span style={{ fontSize: "16px", paddingRight: "8px" }}>
          {props.name}
        </span>
        <span style={{ fontSize: "14px" }}>{props.date}</span>

        <p style={{ position: "relative", maxWidth: "500px" }}>
          {props.message}
        </p>
      </div>
    </div>
  );
}

export default class TicketForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      bugInfo: { ...props },
    };
  }

  render() {
    return (
      <div style={{ backgroundColor: "white" }}>
        <TicketInfoTable {...this.state.bugInfo} />
        <h1>Comments</h1>
        <textarea></textarea>
        <Comment {...sample} />
        <Comment {...sample2} />
      </div>
    );
  }
}
