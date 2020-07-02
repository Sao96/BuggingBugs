import React from "react";

function FromSection(props) {
    const containerStyle = {
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        width: "100%",
    };
    return (
        <section style={containerStyle}>
            <img
                style={{
                    height: "130px",
                    width: "130px",
                    borderRadius: "100%",
                }}
                alt="Profile picture of the author"
                src={props.fromPfp}
            />
            <span style={{ marginTop: "10px" }} />
            <section
                style={{
                    fontFamily: "Didact Gothic",
                    marginBottom: "40px",
                    fontSize: "22px",
                }}
            >
                <span style={{ fontSize: "18px", color: "rgb(200,200,200)" }}>
                    Created By:
                </span>
                <span style={{ paddingLeft: "7px" }}> {props.fromName} </span>
            </section>
        </section>
    );
}

export { FromSection };
