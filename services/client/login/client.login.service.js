import { OriginLoginService } from '../../origin/login/origin.login.service.js'

export class ClientLoginService {
    /**
         * @param {ClientLogin} clientCredentials
     * @returns {Promise<OriginResponse>}
     */
    static login(clientCredentials) {
        return OriginLoginService.post(clientCredentials.username, clientCredentials.password)
    }
}