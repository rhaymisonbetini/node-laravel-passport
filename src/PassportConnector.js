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

}

module.exports = PassportConnector;