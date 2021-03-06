import React, { useCallback, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { ticketboardFields } from "fields/ticketboardfields.js";
import { sharedActions } from "actions/sharedactions";
import { ticketboardActions } from "actions/ticketboardactions";
import {
    FromSection,
    TicketInfoTable,
    EditDeleteButtons,
    ResRender,
    ChangeStateButtons,
} from "./components";
import { ticketStatusMap } from "statusCodes/tickets";
import { ModalTitle } from "util/components/modal";
import { SpinningLoader } from "util/components/loading";
import {
    postDeleteTicket,
    postTicketStatusChange,
} from "apiCalls/BuggingBugs/POST";

function ModalTicketForm(props) {
    const dispatch = useDispatch();
    const [res, setRes] = useState([-1, ""]);
    const [processing, setProcessing] = useState(false);
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
        postDeleteTicket(
            { tid: ticketInfo.tid },
            pid,
            setRes,
            setProcessing,
            dispatch
        );
    }, [pid, ticketInfo.tid, setRes, setProcessing, dispatch]);

    let statusChangeRequestHandlers = {};
    Object.entries(ticketStatusMap).forEach(([name, code]) => {
        statusChangeRequestHandlers[name] = useCallback(() => {
            postTicketStatusChange(
                { newTicketStatus: code, tid: ticketInfo.tid },
                pid,
                setRes,
                setProcessing,
                dispatch
            );
        }, [setRes, setProcessing, dispatch]);
    });

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
            <header
                style={{
                    display: "flex",
                    flexFlow: "column wrap",
                    alignItems: "center",
                    width: "100%",
                }}
            >
                <ModalTitle text={ticketInfo.headline} fontSize={"22px"} />
                <span style={{ marginTop: "10px" }} />

                <FromSection
                    fromPfp={ticketInfo.fromPfp}
                    fromName={ticketInfo.fromName}
                />
            </header>
            <main>
                <TicketInfoTable ticketInfo={ticketInfo} />
            </main>
            <SpinningLoader loading={processing} />
            <section>
                <EditDeleteButtons
                    editHandler={editTicketHandler}
                    deleteHanlder={deleteTicketHandler}
                    authLevel={authLevel}
                    disable={processing}
                />
            </section>
            <section
                style={{
                    display: "flex",
                    justifyContent: "center",
                    marginTop: "20px",
                }}
            >
                <ChangeStateButtons
                    handlers={statusChangeRequestHandlers}
                    ticketStatus={ticketInfo.status}
                    authLevel={authLevel}
                    disable={processing}
                />
            </section>
        </article>
    );
}

export { ModalTicketForm };
