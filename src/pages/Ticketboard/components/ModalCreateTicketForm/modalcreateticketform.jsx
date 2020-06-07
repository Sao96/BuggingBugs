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
const selectFields = (fieldRefs, toSelectData) => {
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
                [0, "MAX"],
                [1, "High"],
                [2, "Medium"],
                [3, "Low"],
            ],
        ],
        ["To", fieldRefs.to, toSelectData],
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
        ["Due", "date", fieldRefs.due],
        ["Time", "text", fieldRefs.time],
        ["Environment", "text", fieldRefs.environment],
        ["Tags", "text", fieldRefs.tags],
        ["Headline", "text", fieldRefs.headline],
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
    data.priority = Math.floor(Number(data.priority));
    var headers = new Headers();
    headers.append("Content-Type", "application/json");
    headers.append("Accept", "application/json");
    const endpoint =
        "http://localhost:3000/createticket?pid=5edb75f55bf43e095256abad"; //subject to change
    const res = await fetch(endpoint, {
        method: "POST",
        headers: headers,
        credentials: "include",
        mode: "cors",
        cache: "no-cache",
        redirect: "follow",
        body: JSON.stringify(data),
    }); //THEN get the info to build the cards
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
                {selectFields(props.fieldRefs, props.toFields)}
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
        environment: createRef(),
        headline: createRef(),
        summary: createRef(),
    };
    const toSelectData = [];
    for (let user in props.users) {
        toSelectData.push([user, props.users[user].name]);
    }
    return (
        <div>
            <CreateForm fieldRefs={fieldRefs} toFields={toSelectData} />
        </div>
    );
}

export { ModalCreateTicketForm };
