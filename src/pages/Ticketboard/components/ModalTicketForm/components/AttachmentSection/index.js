import React from "react";

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

export { AttachmentSection };
