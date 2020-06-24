import { setError } from "~/util/setError";

const validEmail = (email) => {
    const emailRegex = /\S+@\S+\.\S+/;
    return email && typeof email === "string" && emailRegex.test(email);
};

const validPassword = (password) => {
    return typeof password === "string" && password.length >= 8;
};

/**
 * @function nativeLoginVerifier
 * Expects @req.body to have a valid email, firstName, lastName, password,
 * and repassword.
 *
 * On success, sets @req.body.userData's name, email, password, and pfp field
 * and return true.
 */
async function nativeLoginVerifier(req) {
    if (!validEmail(req.body.email)) {
        setError(req, 400, "Invalid email.", "Please enter a valid email.");
        return false;
    } else if (!validPassword(req.body.password)) {
        setError(
            req,
            400,
            "Invalid password entry",
            "Password is not in correct format."
        );
        return false;
    }

    return true;
}

export { nativeLoginVerifier };
