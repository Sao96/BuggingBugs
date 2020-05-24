import React, { Component } from "react";
import AddAttachmentButtonIcon from "svg/AddAttachment.svg";
import DocumentIcon from "svg/TxtDoc.svg";
import ImageIcon from "svg/ImgDoc.svg";
import CloseIcon from "svg/close.svg";
import { useSelector, useDispatch } from "react-redux";
import { ticketboardFields } from "fields/ticketboardfields.js";

const headerStyle = {
    color: "white",
    fontSize: "24px",
    fontFamily: "Didact Gothic",
    marginBottom: "15px",
};

const hrStyle = {
    position: "relative",
    bottom: "5px",
};

const centerDiv = {
    display: "flex",
    justifyContent: "center",
};

function TicketInfoTable(props) {
    const concern = {
        border: "1px solid #999",
        borderCollapse: "collapse",
        fontStyle: "",
        fontFamily: "Didact Gothic, Quattrocento Sans",
        color: "white",
        marginBottom: "20px",
    };

    const dispatch = useDispatch();
    const selector = (key, field) => {
        return useSelector((state) => {
            return state[key][field];
        });
    };

    const ticketInfo = selector(
        "ticketboard",
        ticketboardFields.DISP_TICKET_INFO
    );

    let tableData = [
        ["Priority", ticketInfo.priority],
        ["Due", ticketInfo.dueTime],
        ["Time", ticketInfo.time],
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
        <div
            style={{
                boxShadow: "1px 1px 1px 0px rgba(0,0,0,0.75)",
            }}
        >
            <table style={concern}>
                <tbody>{tableRows}</tbody>
            </table>
        </div>
    );
}

function Comment(props) {
    const commentBoxStyle = {
        backgroundColor: "rgb(70,100,120, 0.7)",
        border: "solid",
        borderWidth: "1px",
        borderColor: "black",
        paddingLeft: "10px",
        paddingTop: "10px",
        position: "relative",
        display: "flex",
        color: "white",
        marginBottom: "10px",
        fontFamily: "Didact Gothic, Quattrocento Sans",
        boxShadow: "1px 1px 1px 0px rgba(0,0,0,0.75)",
        paddingRight: "20px",
    };
    const imgStyle = {
        height: "40px",
        width: "40px",
        borderRadius: "50%",
        borderStyle: "solid",
        borderColor: "black",
        borderWidth: "1px",
        marginRight: "5px",
    };
    const closeSvgStyle = {
        height: "30px",
        width: "30px",
        display: "inline",
        position: "absolute",
        left: "96%",
        top: "-3px",
        fill: "rgb(230,230,230)",
    };

    return (
        <div style={commentBoxStyle}>
            <img style={imgStyle} src={props.pfp} />
            <div style={{ position: "relative", left: "10px" }}>
                <span style={{ fontSize: "16px", paddingRight: "8px" }}>
                    {props.name}
                </span>
                <span style={{ fontSize: "14px", color: "rgb(209, 209, 209)" }}>
                    {props.date}
                </span>
                <CloseIcon style={closeSvgStyle} />
                <p
                    style={{
                        position: "relative",
                        maxWidth: "1000px",
                        fontSize: "16px",
                    }}
                >
                    {props.message}
                </p>
            </div>
        </div>
    );
}

function CommentInputBox() {
    const textInputStyle = {
        backgroundColor: "rgb(10,25,45)",
        color: "white",
        fontFamily: "Didact Gothic",
        fontSize: "17px",
        width: "500px",
        minHeight: "100px",
        overflow: "auto",
        resize: "vertical",
        marginBottom: "10px",
        resize: "none",
    };
    //once the textbox breaks a new line, extend height
    const ReiszeTextarea = (e) => {
        const textBox = e.target;
        textBox.style.height = "auto";
        textBox.style.height = textBox.scrollHeight + "px";
    };

    return (
        <div style={{ display: "flex" }}>
            <textarea
                style={textInputStyle}
                placeholder="Enter a new comment..."
                onChange={ReiszeTextarea.bind(this)}
            ></textarea>
        </div>
    );
}

function AttachmentSection() {
    function AttachmentItem(props) {
        const attchmentItemStyle = {
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "center",
            padding: "13px",
        };
        const iconStyling = {
            fill: "white",
            height: "60px",
            width: "60px",
        };

        const attachTypes = {
            img: ImageIcon,
            txt: DocumentIcon,
        };
        const textStyling = {
            textAlign: "center",
            position: "relative",
            color: "rgb(170, 170, 170)",
            bottom: "10px",
            fontFamily: "Didact Gothic",
            width: "100px",
            overflowWrap: "break-word",
        };

        const AttachType = attachTypes[props.type];
        return (
            <div style={attchmentItemStyle}>
                <AttachType style={iconStyling} />

                <div style={textStyling}>{props.name}</div>
            </div>
        );
    }

    const attachSecStyle = {
        backgroundColor: "rgb(10,40,60)",
        color: "white",
        paddingTop: "10px",
        paddingRight: "15px",
        marginBottom: "20px",
        width: "max-content",
    };

    return (
        <div style={attachSecStyle}>
            <div
                style={{
                    display: "flex",
                    position: "relative",
                    alignItems: "center",
                }}
            >
                <AddAttachmentButtonIcon
                    style={{
                        height: "40px",
                        width: "40px",
                        fill: "white",
                        paddingLeft: "10px",
                    }}
                />
                <AttachmentItem type={"img"} name="cars.jpg" />
                <AttachmentItem type={"txt"} name="secreth.cpp" />
                <AttachmentItem type={"txt"} name="sqladaasdadasd.js" />
            </div>
        </div>
    );
}

function ModalTicketForm(props) {
    const commentSample = {
        pfp: "https://i.imgur.com/aIBs6cj.png",
        name: "Smithy Jones",
        message:
            "Display photos on the home feed get mixed with other users, homepage displays random photo's from the internet. Display photos on the home feed get mixed with other users, homepage displays random photo's from the internet.",
        date: "May 7, 2019, 12:19 PST",
    };

    const commentSample2 = {
        pfp: "https://i.imgur.com/aIBs6cj.png",
        name: "Smithy Jones",
        message:
            "Display photos on the home feed get mixed with other users, homepage displays random photo's from the internet. ",
        date: "May 7, 2019, 12:19 PST",
    };

    return (
        <div style={{ width: "700px" }}>
            <TicketInfoTable />
            <div style={headerStyle}> Attachments </div>
            <hr style={hrStyle}></hr>
            <div style={centerDiv}>
                <AttachmentSection />
            </div>
            <div style={headerStyle}>Comments</div>
            <hr style={hrStyle}></hr>
            <div style={centerDiv}>
                <CommentInputBox />
            </div>
            <Comment {...commentSample} />
            <Comment {...commentSample2} />
        </div>
    );
}

export { ModalTicketForm };
