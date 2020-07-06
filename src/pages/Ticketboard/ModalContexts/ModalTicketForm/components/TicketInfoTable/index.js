import React from "react";
import { tableTheme } from "themeColors";
import { priorityInformationMap } from "util/helperFunctions/ticketHelpers";

function TicketInfoTable(props) {
    const tableStyle = {
        border: "1px solid #999",
        borderCollapse: "collapse",
        fontStyle: "",
        fontFamily: "Didact Gothic, Quattrocento Sans",
        color: "white",
        boxShadow: "1px 1px 1px 0px rgba(0,0,0,0.75)",
    };

    const ticketInfo = props.ticketInfo;
    const [priorityText, bgColor, priorityTextColor] = priorityInformationMap(
        ticketInfo.priority
    );
    let dueDate = new Date(ticketInfo.due + " 00:00:00");

    let tableData = [
        ["Priority", priorityText, priorityTextColor],
        ["Due", dueDate.toString(), "white"],
        ["Tags", ticketInfo.tags, "white"],
        ["Environment", ticketInfo.environment, "white"],
        ["Summary", ticketInfo.summary, "white"],
    ];

    const even = { backgroundColor: tableTheme.even };
    const odd = { backgroundColor: tableTheme.odd };
    const tableRows = tableData.map((data, idx) => {
        return (
            <tr key={idx} style={idx % 2 ? odd : even}>
                <td style={{ fontSize: "17px", padding: "0px 20px" }}>
                    {data[0]}
                </td>
                <td
                    style={{
                        fontSize: "17px",
                        fontFamily: "Heebo",
                        padding: "15px",
                    }}
                >
                    <span style={{ color: data[2] }}>{data[1]}</span>
                </td>
            </tr>
        );
    });

    return (
        <table style={tableStyle}>
            <tbody>{tableRows}</tbody>
        </table>
    );
}

export { TicketInfoTable };
