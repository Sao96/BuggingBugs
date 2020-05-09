import React, { Component } from "react";
import AddAttachment from "../../../svg/AddAttachment.svg";

function TicketInfoTable(props) {
  const concern = {
    border: "1px solid #999",
    borderCollapse: "collapse",
    fontStyle: "",
    fontFamily: "Didact Gothic, Quattrocento Sans",
    color: "white",
    marginBottom: "20px",
  };

  let tableData = [
    ["Priority", props.priority],
    ["Due", props.dueTime],
    ["Time", props.time],
    ["Tags", props.tags],
    ["Environment", props.environment],
    ["Summary", props.summary],
  ];

  const even = { backgroundColor: "rgb(70,100,120, 0.7)" };
  const odd = { backgroundColor: "rgb(30,60,80)" };
  const tableRows = tableData.map((data, idx) => {
    return (
      <tr style={idx % 2 ? odd : even}>
        <td style={{ fontSize: "17px", padding: "0px 20px" }}>{data[0]}</td>
        <td style={{ fontSize: "17px", fontFamily: "Heebo" }}> {data[1]}</td>
      </tr>
    );
  });

  return (
    <div
      style={{
        maxWidth: "1000px",
        boxShadow: "10px 10px 23px -6px rgba(0,0,0,0.75)",
      }}
    >
      <table style={concern}>
        <tbody>{tableRows}</tbody>
      </table>
    </div>
  );
}

function Comment(props) {
  const commentBoxStyle = {
    backgroundColor: "rgb(70,100,120, 0.7)",
    border: "solid",
    borderWidth: "1px",
    borderColor: "black",
    borderRadius: "20px",
    paddingLeft: "10px",
    paddingTop: "10px",
    position: "relative",
    display: "flex",
    color: "white",
    marginBottom: "10px",
    fontFamily: "Didact Gothic, Quattrocento Sans",
    boxShadow: "10px 10px 23px -6px rgba(0,0,0,0.75)",
    paddingRight: "20px",
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
        <span style={{ fontSize: "14px", color: "rgb(209, 209, 209)" }}>
          {props.date}
        </span>

        <p
          style={{ position: "relative", maxWidth: "1000px", fontSize: "16px" }}
        >
          {props.message}
        </p>
      </div>
    </div>
  );
}

function CommentInputBox() {
  const textInputStyle = {
    backgroundColor: "rgb(10,40,60)",
    color: "white",
    fontFamily: "Didact Gothic",
    fontSize: "17px",
    width: "500px",
    minHeight: "100px",
    overflow: "auto",
    resize: "vertical",
    marginBottom: "10px",
    resize: "none",
  };
  //once the textbox breaks a new line, extend height
  const ReiszeTextarea = (e) => {
    const textBox = e.target;
    textBox.style.height = "auto";
    textBox.style.height = textBox.scrollHeight + "px";
  };

  return (
    <div style={{ display: "flex" }}>
      <textarea
        style={textInputStyle}
        placeholder="Enter a new comment..."
        onChange={ReiszeTextarea.bind(this)}
      ></textarea>
      <AddAttachment
        style={{
          height: "40px",
          width: "40px",
          position: "relative",
          top: "40px",
        }}
      />
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
    const commentSample = {
      pfp: "https://i.imgur.com/aIBs6cj.png",
      name: "Smithy Jones",
      message:
        "Display photos on the home feed get mixed with other users, homepage displays random photo's from the internet. Display photos on the home feed get mixed with other users, homepage displays random photo's from the internet.",
      date: "May 7, 2019, 12:19 PST",
    };

    const commentSample2 = {
      pfp: "https://i.imgur.com/aIBs6cj.png",
      name: "Smithy Jones",
      message:
        "Display photos on the home feed get mixed with other users, homepage displays random photo's from the internet. ",
      date: "May 7, 2019, 12:19 PST",
    };
    function CommentBox(props) {}
    return (
      <div style={{}}>
        <TicketInfoTable {...this.state.bugInfo} />
        <CommentInputBox />
        <Comment {...commentSample} />
        <Comment {...commentSample2} />
      </div>
    );
  }
}
