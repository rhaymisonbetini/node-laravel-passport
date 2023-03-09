'use strict'

const PassportConnector = require('./src/PassportConnector');

class Passport {

    constructor() {
        this.passportConnector = new PassportConnector();
        this.client_id = null;
        this.secret_id = null;
        this.callbackUrl = null;
        this.apiEndpoint = null
    }
    /**
     * this function create initial passport config
     * @param {string} client_id 
     * @param {string} secret_id 
     * @param {string} callbackUrl 
     * @return {string}
     */
    createClient(client_id, secret_id, callbackUrl, apiEndpoint) {
        if (!client_id || !secret_id || !callbackUrl || !apiEndpoint) {
            return { message: 'WE_CAN_NOT_CREATE_THE_CLIENT_ALL_PARAMS_IS_REQUIRED' }
        }
        this.client_id = client_id;
        this.secret_id = secret_id;
        this.callbackUrl = callbackUrl;
        this.apiEndpoint = apiEndpoint;
        return { message: 'CLIENTE_CREATED' }
    }

    /**
     * this method create a url to get autorize code in laravel passport
     * @return {string}
     */
    passportCreateUriAutorize() {
        return this.passportConnector.createUriToAutorize(this.client_id, this.callbackUrl, this.apiEndpoint)
    }

    passporGetAccessToken() {

    }
}


module.exports = Passport;