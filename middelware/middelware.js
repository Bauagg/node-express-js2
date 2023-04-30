module.exports = (err, req, res, next) => {
    console.error(err)
    if (err.code & err.message) {
        return res.status(400).json({
            error: true,
            url: req.url,
            method: req.method,
            message: err.message
        })
    }
    return res.status(500).json({
        error: true,
        message: 'internet server error'
    })
}