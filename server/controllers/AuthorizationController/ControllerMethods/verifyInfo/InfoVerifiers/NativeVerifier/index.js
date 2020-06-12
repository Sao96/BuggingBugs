import { setError } from "~/util/setError";

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

/**
 * @function nativeVerifier
 * Expects @req.body to have a valid email, firstName, lastName, password,
 * and repassword.
 *
 * On success, sets @req.body.userData's name, email, password, and pfp field
 * and return true.
 */
async function nativeVerifier(req) {
    if (!validEmail(req.body.email)) {
        setError(req, 400, "Invalid email.", "Please enter a valid email.");
        return false;
    } else if (!validUsername(req.body.firstName, req.body.lastName)) {
        setError(req, 400, "Invalid name(s)", "Please enter valid name(s)");
        return false;
    } else if (!validPasswords(req.body.password, req.body.repassword)) {
        setError(
            req,
            400,
            "Invalid password entry",
            "Please make sure both passwords are valid and match"
        );
        return false;
    }

    req.body.userData.name =
        capitalizeFirst(req.body.firstName) +
        " " +
        capitalizeFirst(req.body.lastName);
    req.body.userData.email = req.body.email;
    req.body.userData.password = req.body.password;
    req.body.userData.pfp = "";

    return true;
}

export { nativeVerifier };
