//initial styles taken from w3schools modal example
import React, { useState } from "react";

export default function topkek(props) {
  let overlayStyle = {
    display: props.isOpen ? "block" : "none" /* Hidden by default */,
    position: "fixed" /* Stay in place */,
    zIndex: "4000" /* Sit on top */,
    paddingTop: "100px" /* Location of the box */,
    left: "0",
    top: "0",
    width: "100%" /* Full width */,
    height: "100%" /* Full height */,
    overflow: "auto" /* Enable scroll if needed */,
    backgroundColor: "rgb(0,0,0)" /* Fallback color */,
    backgroundColor: "rgba(0,0,0,0.4)" /* Black w/ opacity */,
  };

  const contentStyle = {
    margin: "auto",
    padding: "20px",
    border: "1px solid #888",
    width: "80%",
    backgroundColor: "white",
  };

  return (
    <div style={overlayStyle}>
      <div ref={props.assignedRef} style={contentStyle}>
        Honestly, it's kind of weird learning how to use browsers
      </div>
    </div>
  );
}
