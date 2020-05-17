import React from "react";

const Separator = (color) => {
    const styles = {
        border: "1px solid " + color,
        width: "90%",
        marginBottom: "7px",
    };
    return <div style={styles}> </div>;
};

export default Separator;
