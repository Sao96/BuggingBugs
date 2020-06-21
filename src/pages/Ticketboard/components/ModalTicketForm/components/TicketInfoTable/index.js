import React from "react";

function TicketInfoTable(props) {
    const concern = {
        border: "1px solid #999",
        borderCollapse: "collapse",
        fontStyle: "",
        fontFamily: "Didact Gothic, Quattrocento Sans",
        color: "white",
        boxShadow: "1px 1px 1px 0px rgba(0,0,0,0.75)",
    };

    const ticketInfo = props.ticketInfo;
    let tableData = [
        ["Priority", ticketInfo.priority],
        ["Due", ticketInfo.due.toString()],
        ["Tags", ticketInfo.tags],
        ["Environment", ticketInfo.environment],
        ["Summary", ticketInfo.summary],
    ];

    const even = { backgroundColor: "rgb(70,100,120, 0.7)" };
    const odd = { backgroundColor: "rgb(30,60,80)" };
    const tableRows = tableData.map((data, idx) => {
        return (
            <tr style={idx % 2 ? odd : even}>
                <td style={{ fontSize: "17px", padding: "0px 20px" }}>
                    {data[0]}
                </td>
                <td
                    style={{
                        fontSize: "17px",
                        fontFamily: "Heebo",
                        paddingLeft: "30px",
                    }}
                >
                    {" "}
                    {data[1]}
                </td>
            </tr>
        );
    });

    return (
        <div>
            <table style={concern}>
                <tbody>{tableRows}</tbody>
            </table>
        </div>
    );
}

export { TicketInfoTable };
