const validEmail = (email) => {
    const emailRegex = /\S+@\S+\.\S+/;
    return email && typeof email === "string" && emailRegex.test(email);
};

const validUsername = (firstName, lastName) => {
    return (
        typeof firstName === "string" &&
        typeof lastName === "string" &&
        firstName.length >= 1 &&
        lastName.length >= 1
    );
};

const validPasswords = (password, repassword) => {
    return (
        typeof password === "string" &&
        typeof repassword === "string" &&
        password === repassword &&
        password.length >= 8
    );
};

const capitalizeFirst = (s) => {
    return s.charAt(0).toUpperCase() + s.slice(1);
};

async function nativeVerifier(req) {
    if (!validEmail(req.body.email)) {
        req.body.err.status = 400;
        req.body.err.resmsg = "Please enter a valid email";
        req.body.err.what = "Invalid Email";
    } else if (!validUsername(req.body.firstName, req.body.lastName)) {
        req.body.err.status = 400;
        req.body.err.resmsg = "Please enter valid name(s)";
        req.body.err.what = "Invalid name(s)";
    } else if (!validPasswords(req.body.password, req.body.repassword)) {
        req.body.err.status = 400;
        req.body.err.resmsg =
            "Please make sure both passwords are valid and match";
        req.body.err.what = "Invalid password entry";
    }

    req.body.userData.name =
        capitalizeFirst(req.body.firstName) +
        " " +
        capitalizeFirst(req.body.lastName);
    req.body.userData.email = req.body.email;
    req.body.userData.password = req.body.password;
    req.body.userData.pfp = "";
}

export { nativeVerifier };
