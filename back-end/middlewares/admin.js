const adminValidation = (req, res, next) => {
    try {
        if (!req.user) throw Error("User is not logged in");
        if (!req.user.isAdmin) throw Error("User does not have permission");
        next();
    } catch (err) {
        res.status(401).json({
            message: err.message
        });
    }
}

module.exports = adminValidation;