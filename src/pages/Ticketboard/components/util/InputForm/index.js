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
    for (let i in data) {
        data[i][2] = data[i][2].map((optionData) => {
            return <option value={optionData[0]}>{optionData[1]}</option>;
        });
    }
    data = data.map((data) => {
        return (
            <div style={formItemStyle}>
                <label style={labelStyle}>{data[0]}</label>
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
};

const FieldSeparator = (props) => {
    return (
        <div
            style={{
                width: "150px",
                height: "2px",
                backgroundColor: "rgb(227, 238, 255)",
                position: "relative",
                bottom: "4px",
                marginBottom: "5px",
            }}
        ></div>
    );
};

const createInputFields = (fieldData) => {
    //once the textbox breaks a new line, extend height
    const ReiszeTextarea = (e) => {
        const textBox = e.target;
        textBox.style.height = "auto";
        textBox.style.height = textBox.scrollHeight - 4 + "px";
    };
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

    const data = [];
    const date = (
        <div style={formItemStyle}>
            <label style={labelStyle}>Date</label>
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
            <div style={formItemStyle}>
                <label style={labelStyle}>{data[0]}</label>
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
};

export { createInputFields, createSelectFields };
