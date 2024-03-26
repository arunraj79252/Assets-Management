const { Forbidden } = require("../utils/errors")

/**
 * autherize user based on role
 * @param  {...any} permittedRoles 
 * 
 * if permittedRoles containes user's role continue to next middleware
 */
const permit = (...permittedRoles) => async (req, res, next) => {
    if (!permittedRoles.includes(req.user.role))
        next(new Forbidden("you don't have permission to access this resource"))
    next();
}

module.exports = permit;