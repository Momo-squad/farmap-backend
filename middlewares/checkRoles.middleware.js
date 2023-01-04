let checkRoles;

const roles = {
    admin: "admin",
    user: "user",
    seller: "seller"
}

const permissionError = (res, role) => {
    res.status(403).json({ success: false, error: `Please login as ${role}.` })
}

export default checkRoles = {
    isUser(req, res, next) {
        if(req.user.role != roles.user) {
            return permissionError(res, roles.user)
        }
        next()
    },

    isSeller(req, res, next) {
        if(req.user.roles != roles.seller) {
            return permissionError(res, roles.seller)
        }
        next()
    },
    isAdmin(req, res, next) {
        if(req.user.roles != roles.admin) {
            return permissionError(res, roles.admin)
        }
        next()
    }
}