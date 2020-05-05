import React from "react";
import Open from "../../../svg/open.svg";
import Worker from "../../../svg/worker.svg";
import Closed from "../../../svg/closed.svg";

export default function Ticket(props) {
  let bgColor = "rgb(27, 78, 112)";
  let borderColor = "black";
  let separatorColor = "rgb(0, 212, 4)";
  let priorityText, priorityColor;
  switch (props.priority) {
    case 0: //max priority
      bgColor = "rgb(120, 0, 0)";
      borderColor = "black";
      separatorColor = "rgb(255, 0,0)";
      priorityText = "MAX";
      priorityColor = "red";
      break;
    case 1:
      priorityText = "High";
      priorityColor = "rgb(255, 106, 0)";
      separatorColor = "rgb(255, 106, 0)";
      break;
    case 2: //med priority
      priorityText = "Med";
      priorityColor = "yellow";
      separatorColor = "rgb(255, 255,0)";
      break;
    case 3:
      priorityText = "Low";
      priorityColor = "rgb(0, 212, 4)"; //green
  }

  const ticketStyle = {
    //primary style of tickets
    width: "360px",
    height: "230px",
    borderRadius: "10px",
    backgroundColor: bgColor,
    border: "0.5px solid " + borderColor,
    color: "white",
    marginBottom: "70px",
    marginRight: "50px",
    padding: "4px 0px 0px 2px",
    boxShadow: "10px 10px 23px -6px rgba(0,0,0,0.75)",
    fontFamily: "Didact Gothic, Quattrocento Sans",
    fontSize: "18px",
    position: "relative",
  };

  const SizeSVG = (Comp, color = "white") => {
    return <Comp style={{ fill: color, width: "50px", height: "65px" }} />;
  };
  const PFPImage = (image) => {
    return (
      <span style={{ paddingLeft: "10px" }}>
        <img
          style={{
            height: "40px",
            width: "40px",
            borderRadius: "50%",
            borderStyle: "solid",
            borderColor: "black",
            borderWidth: "1px",
          }}
          src={image}
        />
      </span>
    );
  };
  const Sender = (name) => {
    return (
      <span
        style={{
          position: "absolute",
          paddingTop: "10px",
          paddingLeft: "10px",
          fontSize: "19px",
          fontStyle: "italic",
          MarginBottom: "40px",
        }}
      >
        {name}
      </span>
    );
  };
  const Separator = (color) => {
    const styles = {
      border: "1px solid " + color,
      width: "90%",
      marginBottom: "7px",
    };
    return <div style={styles}> </div>;
  };
  const SummaryText = (text) => {
    return (
      <span
        style={{
          textAlign: "center",
          position: "absolute",
          margin: "0px 3px 0px",
        }}
      >
        {text}
      </span>
    );
  };
  const StatusIcon = (status) => {
    let Comp;
    if (status == 0) Comp = Open;
    else if (status == 1) Comp = Worker;
    else Comp = Closed;

    return (
      <span style={{ position: "absolute", left: "4.5%", top: "73%" }}>
        {SizeSVG(Comp, separatorColor)}
      </span>
    );
  };
  const PriorityText = (text, pColor) => {
    return (
      <span
        style={{
          position: "absolute",
          left: "27%",
          top: "80.2%",
          fontStyle: "italic",
          color: "rgb(200,200,200)",
        }}
      >
        Priority:
        <span style={{ color: pColor, fontSize: "21px", fontStyle: "normal" }}>
          {" "}
          {text}
        </span>
      </span>
    );
  };

  const DueDate = (date) => {
    return (
      <span
        style={{
          position: "absolute",
          right: "8.3%",
          top: "82.2%",
          fontStyle: "italic",
          color: "rgb(200,200,200)",
        }}
      >
        Due: {date}
      </span>
    );
  };

  return (
    <div style={ticketStyle}>
      <div>
        {PFPImage(props.pfp)}
        {Sender(props.author)}
        {Separator(separatorColor)}
        {SummaryText(props.summary)}
        {StatusIcon(props.status)}
        {PriorityText(priorityText, priorityColor)}
        {DueDate(props.duedate)}
      </div>
    </div>
  );
}
