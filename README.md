# NODE LARAVEL PASSPORT CONNECTOR
<p align="center">
    <a href="https://github.com/badges/shields/graphs/contributors" alt="Contributors">
        <img src="https://img.shields.io/github/contributors/badges/shields" /></a>
    <a href="#backers" alt="Backers on Open Collective">
        <img src="https://img.shields.io/opencollective/backers/shields" /></a>
    <a href="#sponsors" alt="Sponsors on Open Collective">
        <img src="https://img.shields.io/opencollective/sponsors/shields" /></a>
    <a href="https://github.com/badges/shields/pulse" alt="Activity">
        <img src="https://img.shields.io/github/commit-activity/m/badges/shields" /></a>
    <a href="https://circleci.com/gh/badges/shields/tree/master">
        <img src="https://img.shields.io/circleci/project/github/badges/shields/master" alt="build status"></a>
    <a href="https://circleci.com/gh/badges/daily-tests">
        <img src="https://img.shields.io/circleci/project/github/badges/daily-tests?label=service%20tests"
            alt="service-test status"></a>
    <a href="https://coveralls.io/github/badges/shields">
        <img src="https://img.shields.io/coveralls/github/badges/shields"
            alt="coverage"></a>
    <a href="https://discord.gg/HjJCwm5">
        <img src="https://img.shields.io/discord/308323056592486420?logo=discord"
            alt="chat on Discord"></a>
    <a href="https://twitter.com/intent/follow?screen_name=shields_io">
        <img src="https://img.shields.io/twitter/follow/shields_io?style=social&logo=twitter"
            alt="follow on Twitter"></a>
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

