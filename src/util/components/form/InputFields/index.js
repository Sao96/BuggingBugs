import React from "react";

const InputFields = (props) => {
    const data = props.data;
    const labelStyle = {
        marginRight: "30px",
        marginBottom: "5px",
        fontFamily: "Didact Gothic",
        fontSize: "20px",
    };
    const formItemStyle = {
        marginBottom: "25px",
        display: "flex",
        flexDirection: "column",
    };
    const inputStyle = {
        backgroundColor: "white",
        border: "none",
        height: "25px",
        width: "300px",
        color: "black",
        fontFamily: "Didact Gothic",
        fontSize: "20px",
        paddingLeft: "3px",
    };

    return data.map((data) => {
        return (
            <div style={formItemStyle}>
                <label style={labelStyle}>{data[0]}</label>
                <input type={data[1]} ref={data[2]} style={inputStyle}></input>
            </div>
        );
    });
};

export { InputFields };
