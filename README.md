# NODE LARAVEL PASSPORT CONNECTOR
<p align="center">
   <img alt="Bower" src="https://img.shields.io/bower/l/MI?style=flat-square">
</p>

This package performs Oauth between your NODE application and a LARAVEL application that uses Passport as authentication.<br/>

## INSTALL

```
npm install node-laravel-passport

```

Now you can import with:
```javascript
import Passport from 'node-laravel-passport'
```
Or

```javascript
const Passport = require('node-laravel-passport');
```


### CONFIG LARAVEL APPLICATION

In your laravel application you run the command
```
php artisan passport:client
```
which will generate a client with a client_id, secret_id and a callback url.

### CONFIG YOUR NODE APPLICATION

You must have two endpoints in your node application so that you can receive calls from LARAVEL...<br/>
I advise a call 'youapplicationurl' + 'redirect'...This is the entry url
And another is your callback registered in "passport:client". So y
Then you will have something like this:

```javascript
Route.get('/redirect','PassportController.redirect');
Route.get('/auth/callback','PassportController.callback')
```

### CONFIG YOUR CONTROLLER AND PACKAGE

create an instance of our Passporte connector and connection client <br/>

* client_id - string -provided in passport:client
* secrect_id - string -provided in passport:client
* callback_url - string -provided in passport:client 
* laravelPassportApi - your laravel application (ex: http://localhost:8000)

```javascript
 const passport = new Passport();
 passport.createClient(client_id, secret_id, callback_url, laravelPassportApi);
```
After this process, you should do a redirect requesting your client's code. <br/>
The passportCreateUriAutorize method creates this url and you just have to redirect it in your application

```javascript
    redirect({request, response}) {
    const uriAuthoriize = this.passport.passportCreateUriAutorize();
    response.redirect(uriAuthoriize)
  }
```
As you can see this redirect method is called in the 'redirect' route that comes from the application <br/>

The return of this redirect will be exactly the 'auth/callback' route or the route you registered as a callback in passport:client <br/>
Now we can take our access_token and establish authorization between the two applications <br/>

```javascript
    async callback({request, response}) {
    const code = request.all().code
    let oatuhAcessToken = await this.passport.passporGetAccessToken(code);
  }
```
The return of passporGetAccessToken will be an object with its access_token, token_type, expires_in and a refresh_token <br/>

```json
{
  "token_type": "Bearer",
  "expires_in": "",
  "access_token": "",
  "refresh_token": ""
}
```

### FULL CLASS EXEMPLE

```javascript
'use strict'

const Passport = require('node-laravel-passport');

const client_id = '';
const secret_id = '';
const callback_url = 'http://127.0.0.1:3333/auth/callback';
const laravelPassportApi = 'http://127.0.0.1:8000'

class PassportController {

  constructor() {
    this.passport = new Passport();
    this.passport.createClient(client_id, secret_id, callback_url, laravelPassportApi);
  }


  redirect({request, response}) {
    const uriAuthoriize = this.passport.passportCreateUriAutorize();
    response.redirect(uriAuthoriize)
  }

  async callback({request, response}) {
    const code = request.all().code
    let oatuhAcessToken = await this.passport.passporGetAccessToken(code);
  }

}

module.exports = PassportController


```