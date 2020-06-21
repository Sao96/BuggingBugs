import React, { Component } from "react";
import AddAttachmentButtonIcon from "svg/AddAttachment.svg";
import DocumentIcon from "svg/TxtDoc.svg";
import ImageIcon from "svg/ImgDoc.svg";
import CloseIcon from "svg/close.svg";
import { useSelector, useDispatch } from "react-redux";
import { ticketboardFields } from "fields/ticketboardfields.js";
import Button from "util/Button.jsx";
import { sharedActions } from "actions/sharedactions";
import { ticketboardActions } from "../../../../actions/ticketboardactions";
import { TicketInfoTable } from "./components/TicketInfoTable";
import { TextButton } from "util/TextButton";

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

const EditDeleteButtons = (props) => {
    const containerStyle = {
        display: "flex",
        justifyContent: "space-around",
        width: "50%",
        fontSize: "18px",
        fontFamily: "Didact Gothic",
        marginBottom: "2px",
    };
    return (
        <main style={containerStyle}>
            <TextButton text={"Edit"} handler={props.editHandler} />
            <TextButton text={"Delete"} handler={props.deleteHandler} />
        </main>
    );
};

function ModalTicketForm(props) {
    const ticketInfo = useSelector((state) => {
        return state.ticketboard[ticketboardFields.DISP_TICKET_INFO];
    });
    const dispatch = useDispatch();
    const editTicketHandler = () => {
        dispatch({
            type: ticketboardActions.SET_CREATE_FORM_INFO,
            initVals: ticketInfo,
        });
        dispatch({ type: sharedActions.PUSH_MODAL_STATE, modalState: 3 });
    };
    const deleteTicketHandler = () => {};

    return (
        <article
            style={{
                width: "600px",
                display: "flex",
                alignItems: "center",
                flexDirection: "column",
            }}
        >
            <TicketInfoTable ticketInfo={ticketInfo} />
            <EditDeleteButtons
                editHandler={editTicketHandler}
                deleteHanlder={deleteTicketHandler}
            />
            <div
                style={{
                    display: "flex",
                    justifyContent: "center",
                    marginTop: "20px",
                }}
            >
                <Button
                    text={"Close Ticket"}
                    backgroundColor={"green"}
                    onClick={editTicketHandler}
                />{" "}
            </div>
        </article>
    );
}

export { ModalTicketForm };

// const commentSample = {
//     pfp: "https://i.imgur.com/aIBs6cj.png",
//     name: "Smithy Jones",
//     message:
//         "Display photos on the home feed get mixed with other users, homepage displays random photo's from the internet. Display photos on the home feed get mixed with other users, homepage displays random photo's from the internet.",
//     date: "May 7, 2019, 12:19 PST",
// };
// const commentSample2 = {
//     pfp: "https://i.imgur.com/aIBs6cj.png",
//     name: "Smithy Jones",
//     message:
//         "Display photos on the home feed get mixed with other users, homepage displays random photo's from the internet. ",
//     date: "May 7, 2019, 12:19 PST",
// };

{
    /* <div style={headerStyle}> Attachments </div>
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
            <Comment {...commentSample2} /> */
}
