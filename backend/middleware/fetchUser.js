const jwt = require('jsonwebtoken')

const JWT_SECRET = "NAVEEN@123";

const fetchUser = (req, res, next) => {
    //Get the user from the jwt token and add id to req body
    const authToken = req.header("auth-token")
    if (!authToken) {
        res.status(401).send({ error: "Please authenticate with valid token" })
    }

    try {
        const data = jwt.verify(authToken, JWT_SECRET);
        req.user = data.user
        next()
    } catch (error) {
        res.status(401).send({ error: "Please authenticate with valid token" })
    }

}

module.exports = fetchUser;