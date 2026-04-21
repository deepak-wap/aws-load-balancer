export default class Guard {
    async canActivate(req) {
        throw new Error('Guard method not implemented');
    }
}
