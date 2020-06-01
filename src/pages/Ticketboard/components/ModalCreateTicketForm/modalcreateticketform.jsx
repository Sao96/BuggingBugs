import React, { createRef, useCallback } from "react";
import Button from "util/Button.jsx";

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
const selectFields = (fieldRefs) => {
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
            fieldRefs.priority,
            [
                ["0", "MAX"],
                ["1", "High"],
                ["2", "Medium"],
                ["3", "Low"],
            ],
        ],
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
                <select ref={data[1]} style={selectStyle}>
                    {data[2]}
                </select>
            </div>
        );
    });

    return data;
};

const inputFields = (fieldRefs) => {
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
        ["Due", "text", fieldRefs.due],
        ["Time", "text", fieldRefs.time],
        ["Environment", "text", fieldRefs.env],
        ["Tags", "text", fieldRefs.tags],
        ["Summary", "text", fieldRefs.summary],
    ].map((data) => {
        return (
            <div style={formItemStyle}>
                <label style={labelStyle}>{data[0]}</label>
                <input type={data[1]} ref={data[2]} style={inputStyle}></input>
            </div>
        );
    });
    return data;
};

const PushTicket = async (fieldRefs) => {
    const data = {};
    for (let field in fieldRefs) {
        if (fieldRefs[field].current) {
            data[field] = fieldRefs[field].current.value;
        }
    }
    const url = "http://localhost:3000/createticket";
    const res = await fetch(url, {
        method: "POST",
        mode: "no-cors",
        cache: "no-cache",
        redirect: "follow",
        body: JSON.stringify(data),
    });
    console.log(res);
};

function CreateForm(props) {
    const mainStyle = {
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
    };

    const createClickHandler = useCallback(() => {
        PushTicket(props.fieldRefs);
    }, [props.fieldRefs]);
    return (
        <div style={mainStyle}>
            <div>
                {selectFields(props.fieldRefs)}
                {inputFields(props.fieldRefs)}
            </div>
            <Button
                text={"Create Ticket"}
                onClick={createClickHandler}
                backgroundColor="green"
            />
        </div>
    );
}

function ModalCreateTicketForm(props) {
    const fieldRefs = {
        to: createRef(),
        priority: createRef(),
        due: createRef(),
        time: createRef(),
        tags: createRef(),
        env: createRef(),
        summary: createRef(),
    };
    return (
        <div>
            <CreateForm fieldRefs={fieldRefs} />
        </div>
    );
}

export { ModalCreateTicketForm };
