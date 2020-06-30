import React from "react";

function UserSelectFields(props) {
    const [users, userRef] = [props.users, props.userRef];
    const selectStyle = {
        height: "35px",
        width: "200px",
        backgroundColor: "rgb(10, 25, 45)",
        color: "white",
        fontSize: "20px",
        fontFamily: "Didact Gothic",
    };

    return (
        <select ref={userRef} style={selectStyle}>
            {users.map((userData, idx) => {
                return (
                    <option key={idx} value={userData[0]}>
                        {userData[1]}
                    </option>
                );
            })}
        </select>
    );
}

export { UserSelectFields };
