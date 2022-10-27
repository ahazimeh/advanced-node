const { clearHash } = require('../services/cache');

module.exports = async (req, res, next) => {
    await next() // await the next function so the middleware runs after the next function finish execution

    clearHash(req.user.id)
}