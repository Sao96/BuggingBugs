import React from "react";

function FromSection(props) {
    const containerStyle = {
        display: "flex",
        flexFlow: "column wrap",
        alignItems: "center",
    };

    return (
        <section style={containerStyle}>
            <img
                style={{
                    height: "130px",
                    width: "130px",
                    border: "1px solid black",
                    borderRadius: "100%",
                }}
                src={props.fromPfp}
            />
            <div
                style={{
                    fontFamily: "Didact Gothic",
                    marginBottom: "40px",
                }}
            >
                From:{" "}
                <span style={{ paddingLeft: "5px" }}> {props.fromName} </span>
            </div>
        </section>
    );
}

export { FromSection };
