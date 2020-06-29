import React from "react";
import { ticketFormStyles } from "globalStyles";
import { FieldSeparator } from "util/components/ticket";

function TicketInputFields(props) {
    const fieldData = props.fieldData;
    const ReiszeTextarea = (e) => {
        const textBox = e.target;
        textBox.style.height = "auto";
        textBox.style.height = textBox.scrollHeight - 4 + "px";
    };
    const data = [];

    const dateStyle = {
        backgroundColor: "white",
        border: "none",
        height: "35px",
        width: "300px",
        color: "black",
        fontFamily: "Didact Gothic",
        fontSize: "20px",
        paddingLeft: "3px",
    };
    const date = (
        <div style={ticketFormStyles.formItemStyle}>
            <label style={ticketFormStyles.labelStyle}>Date</label>
            <FieldSeparator />
            <input
                style={dateStyle}
                type="date"
                ref={fieldData.due[0]}
                defaultValue={fieldData.due[1]}
            ></input>
        </div>
    );
    data.push(date);

    const textareaFields = [
        // ["Due", "date", fieldData.due[0], fieldData.due[1]],
        [
            "Environment",
            "text",
            fieldData.environment[0],
            fieldData.environment[1],
            ["400px", "50px"],
        ],
        [
            "Tags",
            "text",
            fieldData.tags[0],
            fieldData.tags[1],
            ["400px", "50px"],
        ],

        [
            "Headline",
            "text",
            fieldData.headline[0],
            fieldData.headline[1],
            ["400px", "50px"],
        ],
        [
            "Summary",
            "text",
            fieldData.summary[0],
            fieldData.summary[1],
            ["400px", "150px"],
        ],
    ].map((data) => {
        const textInputStyle = {
            backgroundColor: "rgb(255,255,255)",
            fontFamily: "Didact Gothic",
            fontSize: "17px",
            border: "1px solid gray",
            width: data[4][0],
            height: data[4][1],
            minHeight: data[4][1],
            color: "black",
            overflow: "auto",
            resize: "vertical",
            marginBottom: "10px",
            resize: "none",
        };
        return (
            <div style={ticketFormStyles.formItemStyle}>
                <label style={ticketFormStyles.labelStyle}>{data[0]}</label>
                <FieldSeparator />
                <textarea
                    ref={data[2]}
                    defaultValue={data[3]}
                    style={textInputStyle}
                    onChange={ReiszeTextarea.bind(this)}
                ></textarea>
            </div>
        );
    });

    return data.concat(textareaFields);
}

export { TicketInputFields };
