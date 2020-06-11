import React from "react";

const formItemStyle = {
    marginBottom: "25px",
    display: "flex",
    flexDirection: "column",
};
const labelStyle = {
    marginRight: "30px",
    marginBottom: "5px",
    fontFamily: "Didact Gothic",
    fontSize: "20px",
};
const createSelectFields = (fieldData, userMap) => {
    const selectStyle = {
        height: "35px",
        width: "200px",
        backgroundColor: "rgb(10, 25, 45)",
        color: "white",
        fontSize: "20px",
        fontFamily: "Didact Gothic",
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
    for (let i in data) {
        data[i][2] = data[i][2].map((optionData) => {
            return <option value={optionData[0]}>{optionData[1]}</option>;
        });
    }
    data = data.map((data) => {
        return (
            <div style={formItemStyle}>
                <label style={labelStyle}>{data[0]}</label>
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
};

const createInputFields = (fieldData) => {
    const inputStyle = {
        backgroundColor: "rgb(10, 25, 45)",
        height: "25px",
        width: "300px",
        color: "white",
        fontFamily: "Didact Gothic",
        fontSize: "20px",
        paddingLeft: "3px",
    };
    const data = [
        ["Due", "date", fieldData.due[0], fieldData.due[1]],
        [
            "Environment",
            "text",
            fieldData.environment[0],
            fieldData.environment[1],
        ],
        ["Tags", "text", fieldData.tags[0], fieldData.tags[1]],
        ["Headline", "text", fieldData.headline[0], fieldData.headline[1]],
        ["Summary", "text", fieldData.summary[0], fieldData.summary[1]],
    ].map((data) => {
        return (
            <div style={formItemStyle}>
                <label style={labelStyle}>{data[0]}</label>
                <input
                    type={data[1]}
                    ref={data[2]}
                    defaultValue={data[3]}
                    style={inputStyle}
                ></input>
            </div>
        );
    });
    return data;
};

export { createInputFields, createSelectFields };
