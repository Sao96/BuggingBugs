import React from "react";
import Open from "../../../svg/open.svg";
import Worker from "../../../svg/worker.svg";
import Closed from "../../../svg/closed.svg";
import Modal from "../modal.jsx";

export default function Ticket(props) {
  let bgColor, priorityText, priorityColor;
  let borderColor = "black";

  switch (props.priority) {
    case 0: //max priority
      bgColor = "rgb(143, 0, 0)";
      priorityText = "MAX";
      priorityColor = "red";
      break;
    case 1:
      bgColor = "rgb(207, 80, 0)";
      priorityText = "High";
      priorityColor = "rgb(255,175,0)";
      break;
    case 2: //med priority
      bgColor = "rgb(156, 142, 0)";
      priorityText = "Med";
      priorityColor = "yellow";
      break;
    case 3:
      priorityText = "Low";
      bgColor = "rgb(38, 135, 16)";
      priorityColor = "rgb(0, 255, 22)"; //green
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
    boxShadow: "2px 4px 4px 0px rgba(0,0,0,0.75)",
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
        {SizeSVG(Comp, priorityColor)}
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

  const handleClick = () => {
    props.boardHandler(props);
  };
  return (
    <div style={ticketStyle} onClick={handleClick}>
      <div>
        {PFPImage(props.pfp)}
        {Sender(props.author)}
        {Separator(priorityColor)}
        {SummaryText(props.summary)}
        {StatusIcon(props.status)}
        {PriorityText(priorityText, priorityColor)}
        {DueDate(props.duedate)}
      </div>
    </div>
  );
}
