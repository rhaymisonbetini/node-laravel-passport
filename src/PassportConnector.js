'use strict'

const axios = require('axios');
class PassportConnector {

    /**
    * this method create a url to get autorize code in laravel passport
     * @param {string} client 
     * @param {string} callback 
     * @param {string} endpoint
     * @return {string} 
     */
    createUriToAutorize(client, callback, endpoint) {
        const params = new URLSearchParams({
            "client_id": client,
            "redirect_uri": callback,
            "scope": "",
            "state": "",
            "response_type": "code"

        });
        const URI = endpoint + '/oauth/authorize?' + params.toString();
        return URI;
    }

    /**
     * this function get acess_token by code returned in createUriToAutorize
     * @param {string} client 
     * @param {string} secret 
     * @param {string} callback 
     * @param {string} endpoint 
     * @param {string} code 
     * @return {Promise<Object>}
     */
    async getAcsessToken(client, secret, callback, endpoint, code) {

        let passportResponse = await axios.post(endpoint + '/oauth/token', {
            'grant_type': 'authorization_code',
            'client_id': client,
            'client_secret': secret,
            'redirect_uri': callback,
            'code': code
        }).catch(err => {
            return err;
        })
        return passportResponse
    }

}

module.exports = PassportConnector;