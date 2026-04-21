import Guard from '../common/guards/guard.interface.js';
import config from '../config/index.js';

export default class ApiKeyGuard extends Guard {
    async canActivate(req) {
        console.log(config.APP_API_KEY, "check");
        
        const apiKey = req.headers['x-api-key'];
        if (!apiKey) return false;

        return apiKey === config.APP_API_KEY;
    }
}