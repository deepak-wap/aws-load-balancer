import Guard from '../common/guards/guard.interface.js';

const RoleGuard = (allowedRoles = []) => {
    return new (class extends Guard {
        async canActivate(req) {
            if (!req.user || !req.user.role) return false;
            return allowedRoles.includes(req.user.role);
        }
    })();
};

export default RoleGuard;