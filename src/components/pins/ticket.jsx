import React from "react";
import Worker from "../../../svg/worker.svg";

export default function Ticket(props) {
  const Separator = (color) => {
    const styles = {
      border: "1px solid " + color,
      width: "90%",
      marginTop: "5px",
      marginBottom: "5px",
    };
    return <div style={styles}> </div>;
  };

  const ticketStyle = {
    //primary style of tickets
    width: "290px",
    height: "210px",
    borderRadius: "10px",
    backgroundColor: "rgb(255,0,0,.5)",
    color: "white",
    marginTop: "5px",
    padding: "2px 0 0 2px",
    border: "0.5px solid maroon",
    boxShadow: "10px 10px 23px -6px rgba(0,0,0,0.75)",
    fontFamily: "Quattrocento Sans",
    fontSize: "20px",
    justifyContent: "center",
    position: "relative",
  };

  const SizeSVG = (Comp) => {
    return <Comp style={{ width: "50px", height: "65px" }} />;
  };
  const PFPImage = (image) => {
    return (
      <img
        style={{ height: "40px", width: "40px", borderRadius: "50%" }}
        src={image}
      />
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
  const DueDate = (date) => {
    return (
      <span
        style={{
          position: "absolute",
          right: "2%",
          top: "90%",
          fontStyle: "italic",
          color: "rgb(200,200,200)",
        }}
      >
        Due: {date}
      </span>
    );
  };
  const StatusIcon = (status) => {
    return (
      <span style={{ position: "absolute", left: "-1%", top: "75%" }}>
        {SizeSVG(Worker)}
      </span>
    );
  };

  return (
    <div style={ticketStyle}>
      <div>
        {PFPImage(props.pfp)}
        {Sender(props.author)}
        {Separator(props.priority)}
        Strings sent to website end up being corrupted when displayed afterward
        {StatusIcon(props.status)}
        {DueDate(props.duedate)}
      </div>
    </div>
  );
}
