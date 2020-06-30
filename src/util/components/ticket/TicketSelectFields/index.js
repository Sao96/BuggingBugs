import React from "react";
import { ticketFormStyles } from "globalStyles";
import { FieldSeparator } from "util/components/ticket";

function TicketSelectFields(props) {
    const [fieldData, userMap] = [props.fieldData, props.userMap];
    const selectStyle = {
        height: "35px",
        width: "200px",
        backgroundColor: "rgb(10, 25, 45)",
        color: "white",
        fontSize: "20px",
        fontFamily: "Didact Gothic",
        marginTop: "5px",
    };
    let data = [
        [
            "Priority",
            fieldData.priority[0],
            [
                [0, "MAX"],
                [1, "High"],
                [2, "Medium"],
                [3, "Low"],
            ],
            fieldData.priority[1],
        ],
        ["To", fieldData.to[0], userMap, fieldData.to[1]],
    ];

    data.forEach((item) => {
        item[2] = item[2].map((optionData, idx) => {
            return (
                <option key={idx} value={optionData[0]}>
                    {optionData[1]}
                </option>
            );
        });
    });

    data = data.map((data, idx) => {
        return (
            <div key={idx} style={ticketFormStyles.formItemStyle}>
                <label style={ticketFormStyles.labelStyle}>{data[0]}</label>
                <FieldSeparator />
                <select
                    ref={data[1]}
                    style={selectStyle}
                    defaultValue={data[3]}
                >
                    {data[2]}
                </select>
            </div>
        );
    });

    return data;
}

export { TicketSelectFields };
