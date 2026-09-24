const tenantMiddleware = (req, res, next) => {
    try {
        if (!req.user) {
            return res.status(401).json({
                success: false,
                message: "Authentication required"
            });
        }

        // Super admin is platform-level
        if (req.user.role === "super_admin") {
            req.tenantId = null;
            return next();
        }

        // Seller, seller staff and customer
        if (!req.user.tenantId) {
            return res.status(403).json({
                success: false,
                message: "Tenant not assigned"
            });
        }

        req.tenantId = req.user.tenantId;

        next();
    } catch (error) {
        next(error);
    }
};

export default tenantMiddleware;