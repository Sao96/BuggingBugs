import React from "react";
import Open from "../../../svg/open.svg";
import Worker from "../../../svg/worker.svg";
import Closed from "../../../svg/closed.svg";

export default function Ticket(props) {
  let bgColor, borderColor, separatorColor;
  switch (props.priority) {
    case 0: //max priority
      bgColor = "rgb(150,0,.5)";
      borderColor = "rgb(50, 0, 0)";
      separatorColor = "red";
      break;
    case 1:
      bgColor = "rgb(185, 84, 0 )";
      borderColor = "rgb(59, 30, 0)";
      separatorColor = "rgb(255, 116, 0 )";
      break;
    case 2: //high priority
      bgColor = "rgb(101, 118, 0)";
      borderColor = "rgb(54, 64, 0)";
      separatorColor = "rgb(172, 202, 0 )";
      break;
    case 3:
      bgColor = "rgb(0, 152, 143 )";
      borderColor = "rgb(0, 126, 118 )";
      separatorColor = "rgb(0, 234, 219  )";
  }

  const ticketStyle = {
    //primary style of tickets
    width: "360px",
    height: "230px",
    borderRadius: "10px",
    backgroundColor: bgColor,
    border: "0.5px solid " + borderColor,
    color: "white",
    marginTop: "5px",
    padding: "4px 0px 0px 2px",
    boxShadow: "10px 10px 23px -6px rgba(0,0,0,0.75)",
    fontFamily: "Didact Gothic, Quattrocento Sans",
    fontSize: "18px",
    position: "relative",
  };

  const SizeSVG = (Comp) => {
    return <Comp style={{ fill: "white", width: "50px", height: "65px" }} />;
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
        {SizeSVG(Comp)}
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
        {DueDate(props.duedate)}
      </div>
    </div>
  );
}
