export const errormidleware = (error, req, res, next) => {
    res.status(400).send({
        success: false,
        error
    })
}
