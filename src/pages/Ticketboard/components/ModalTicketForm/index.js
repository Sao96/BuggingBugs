import React, { useEffect, useCallback, useState } from "react";
import AddAttachmentButtonIcon from "svg/AddAttachment.svg";
import DocumentIcon from "svg/TxtDoc.svg";
import ImageIcon from "svg/ImgDoc.svg";
import CloseIcon from "svg/close.svg";
import { useSelector, useDispatch } from "react-redux";
import { ticketboardFields } from "fields/ticketboardfields.js";
import Button from "util/Button.jsx";
import { sharedActions } from "actions/sharedactions";
import { ticketboardActions } from "actions/ticketboardactions";
import { TicketInfoTable } from "./components/TicketInfoTable";
import { TextButton } from "util/TextButton";
import { ModalTitle } from "util/ModalTitle";
import { SuccessBox } from "util/SuccessBox";
import { ErrorBox } from "util/ErrorBox";
import { ticketStatusCodes } from "util/ticketStatusCodes";
import { domain } from "routes";
import ClipLoader from "react-spinners/ClipLoader";

async function PushTicketDelete(pid, tid, setRes, setLoading, dispatch) {
    setLoading(true);
    var headers = new Headers();
    headers.append("Content-Type", "application/json");
    headers.append("Accept", "application/json");
    const data = {
        tid: tid,
    };
    const endpoint = domain + "deleteticket?pid=" + pid; //subject to change
    const res = await fetch(endpoint, {
        method: "POST",
        headers: headers,
        credentials: "include",
        mode: "cors",
        cache: "no-cache",
        redirect: "follow",
        body: JSON.stringify(data),
    });
    const resStatus = res.status,
        resData = await res.json();
    if (resStatus === 200) {
        dispatch({ type: ticketboardActions.SET_REFRESH_NEEDED });
        dispatch({ type: sharedActions.EMPTY_MODAL_STACK });
    } else {
        setLoading(false);
        setRes([resData, resStatus]);
    }
}
async function PushTicketStatusChange(
    newTicketStatus,
    pid,
    tid,
    setRes,
    setLoading,
    dispatch
) {
    setLoading(true);
    var headers = new Headers();
    headers.append("Content-Type", "application/json");
    headers.append("Accept", "application/json");
    const data = {
        tid: tid,
        newTicketStatus: newTicketStatus,
    };
    const endpoint = domain + "updateticketstatus?pid=" + pid; //subject to change
    const res = await fetch(endpoint, {
        method: "POST",
        headers: headers,
        credentials: "include",
        mode: "cors",
        cache: "no-cache",
        redirect: "follow",
        body: JSON.stringify(data),
    });
    const resStatus = res.status,
        resData = await res.json();
    if (resStatus === 200) {
        dispatch({ type: ticketboardActions.SET_REFRESH_NEEDED });
        dispatch({ type: sharedActions.EMPTY_MODAL_STACK });
    } else {
        setLoading(false);
        setRes([resData, resStatus]);
    }
}

const FromSection = (props) => {
    const containerStyle = {
        display: "flex",
        flexFlow: "column wrap",
        alignItems: "center",
    };

    return (
        <section style={containerStyle}>
            <img
                style={{
                    height: "130px",
                    width: "130px",
                    border: "1px solid black",
                    borderRadius: "100%",
                }}
                src={props.fromPfp}
            />
            <div
                style={{
                    fontFamily: "Didact Gothic",
                    marginBottom: "40px",
                }}
            >
                From:{" "}
                <span style={{ paddingLeft: "5px" }}> {props.fromName} </span>
            </div>
        </section>
    );
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
            <TextButton text={"Delete"} handler={props.deleteHanlder} />
        </main>
    );
};

const ResRender = (props) => {
    const res = props.res;
    switch (res[1]) {
        case -1:
            return <></>;
        case 400:
        case 500:
            return <ErrorBox text={res[0]} />;
        default:
            return <ErrorBox text={"An unknown error has occured."} />;
    }
};

const RenderLoading = (props) => {
    if (props.loading) {
        return (
            <ClipLoader size={100} color={"rgb(200,200,200)"} loading={true} />
        );
    }

    return <></>;
};

const ChangeTicketStateButtonsLeader = (props) => {
    const ticketStatus = props.ticketStatus;
    const handlers = props.handlers;
    let button1Data, button2Data;
    switch (ticketStatus) {
        case ticketStatusCodes["open"]:
            button1Data = ["Close", "green", handlers["closed"]];
            button2Data = null;
            break;
        case ticketStatusCodes["pending"]:
            button1Data = ["Approve", "green", handlers["closed"]];
            button2Data = ["Decline", "red", handlers["open"]];
            break;
        case ticketStatusCodes["closed"]:
            button1Data = ["Reopen", "green", handlers["open"]];
            button2Data = null;
            break;
    }
    const button1 = (
        <Button
            text={button1Data[0]}
            backgroundColor={button1Data[1]}
            onClick={button1Data[2]}
        />
    );
    const button2 = button2Data ? (
        <Button
            text={button2Data[0]}
            backgroundColor={button2Data[1]}
            onClick={button2Data[2]}
        />
    ) : (
        <></>
    );
    return (
        <div style={{ display: "flex" }}>
            {button1}
            <span style={{ paddingLeft: "15px" }} />
            {button2}
        </div>
    );
};
const ChangeTicketStateButtonsRegular = (props) => {
    const ticketStatus = props.ticketStatus;
    const handlers = props.handlers;
    let buttonData;
    switch (ticketStatus) {
        case ticketStatusCodes["open"]:
            buttonData = ["Request Review", "green", handlers["pending"]];
            break;
        case ticketStatusCodes["pending"]:
            buttonData = ["Cancel Review", "red", handlers["open"]];
            break;
        case ticketStatusCodes["closed"]:
            const closedButtonStyle = {
                display: "flex",
                justifyContent: "center",
                padding: "10px",
                fontFamily: "Didact Gothic",
                fontSize: "20px",
            };
            return <div style={closedButtonStyle}>Ticket is closed.</div>;
    }

    return (
        <Button
            text={buttonData[0]}
            backgroundColor={buttonData[1]}
            onClick={buttonData[2]}
        />
    );
};

function ModalTicketForm(props) {
    const dispatch = useDispatch();
    const [res, setRes] = useState(["", -1]);
    const [loading, setLoading] = useState(false);
    const [pid, ticketInfo, authLevel] = useSelector((state) => {
        return [
            state.ticketboard[ticketboardFields.PID],
            state.ticketboard[ticketboardFields.DISP_TICKET_INFO],
            state.ticketboard[ticketboardFields.AUTH_LEVEL],
        ];
    });
    const editTicketHandler = () => {
        dispatch({
            type: ticketboardActions.SET_CREATE_FORM_INFO,
            initVals: ticketInfo,
        });
        dispatch({ type: sharedActions.PUSH_MODAL_STATE, modalState: 3 });
    };
    const deleteTicketHandler = useCallback(() => {
        PushTicketDelete(pid, ticketInfo.tid, setRes, setLoading, dispatch);
    }, [pid, ticketInfo.tid]);

    let statusChangeRequestHandlers = {};
    for (let [name, code] of Object.entries(ticketStatusCodes)) {
        statusChangeRequestHandlers[name] = useCallback(() => {
            PushTicketStatusChange(
                code,
                pid,
                ticketInfo.tid,
                setRes,
                setLoading,
                dispatch
            );
        }, [setRes, setLoading, dispatch]);
    }

    const changeStateButtons =
        authLevel === 0 ? (
            <ChangeTicketStateButtonsLeader
                handlers={statusChangeRequestHandlers}
                ticketStatus={ticketInfo.status}
            />
        ) : (
            <ChangeTicketStateButtonsRegular
                handlers={statusChangeRequestHandlers}
                ticketStatus={ticketInfo.status}
            />
        );

    return (
        <article
            style={{
                width: "600px",
                display: "flex",
                alignItems: "center",
                flexDirection: "column",
            }}
        >
            <ResRender res={res} />
            <ModalTitle text={"View Ticket"} />
            <FromSection
                fromPfp={ticketInfo.fromPfp}
                fromName={ticketInfo.fromName}
            />

            <TicketInfoTable ticketInfo={ticketInfo} />
            <RenderLoading loading={loading} />
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
                {changeStateButtons}
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
