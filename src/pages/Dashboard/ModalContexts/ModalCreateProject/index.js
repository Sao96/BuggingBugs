import React, { createRef, useState, useCallback, useEffect } from "react";
import CreateGroupIcon from "svg/create.svg";
import { useDispatch } from "react-redux";
import { dashboardActions } from "actions/dashboardactions";
import { ResRender } from "./components";
import { DefaultButton } from "buttons";
import { resolveRefValues } from "util/helperFunctions/refHelpers";
import { ModalTitle } from "util/components/modal";
import { InputFields } from "util/components/form";
import { SpinningLoader } from "util/components/loading";
import { postCreateProject } from "apiCalls/BuggingBugs/POST";

function ModalCreateProject(props) {
    const dispatch = useDispatch();
    const [processing, setProcessing] = useState(false);
    const [res, setRes] = useState([-1, ""]);
    const projNameRef = createRef();
    const fieldRefs = {
        projName: createRef(),
        img: createRef(),
    };
    const formFields = [
        ["Name of new group:", "input", fieldRefs.projName],
        ["Group image URL (optional)", "input", fieldRefs.img],
    ];
    useEffect(() => {
        return () => {
            dispatch({ type: dashboardActions.SET_PROJECTS_MODIFIED });
        };
    }, []);
    const createButtonHandler = useCallback(() => {
        postCreateProject(resolveRefValues(fieldRefs), setRes, setProcessing);
    }, [projNameRef, setProcessing, setRes]);

    const containerStyle = {
        display: "flex",
        flexWrap: "wrap",
        fontFamily: "didact gothic",
        alignItems: "center",
        flexDirection: "column",
        position: "relative",
        width: "600px",
        fontSize: "20px",
    };
    const inputStyle = {
        height: "26px",
        width: "300px",
        fontSize: "20px",
        fontFamily: "Didact Gothic",
        margin: "20px 0px",
    };
    const createGroupSvgStyle = {
        height: "150px",
        width: "150px",
        fill: "rgb(180,180,180)",
    };
    return (
        <article style={containerStyle}>
            <ResRender res={res} />
            <SpinningLoader loading={processing} />
            <CreateGroupIcon style={createGroupSvgStyle} />
            <ModalTitle text={"Create New Group"} />
            <InputFields data={formFields} />
            <span style={{ marginTop: "10px" }} />
            <DefaultButton
                text={"Create"}
                backgroundColor={"green"}
                onClick={!processing ? createButtonHandler : null}
            />
        </article>
    );
}

export { ModalCreateProject };
