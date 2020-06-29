import React from "react";

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

export { CommentInputBox };
