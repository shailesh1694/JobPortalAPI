const forgetMiddleware = async (req, res, next) => {

    const authorization = req.headers.authorization
    if (!authorization) {
        next("Authrization Failed")
    }

    try {
        const payload = await Jwt.verify(authorization, "Shailesh@1994$16&10&Mittal")
        if (!payload) {
            return res.status(400).send("Auth Token Expire !")
        }
        req.user = { userId: payload.userId }
        next()
    } catch (error) {
        next(error)
    }
}

export default forgetMiddleware;