# Node REST API Technical Test

To set up this app:

 * clone the repository
 * run `npm install` to download necessary packages
 * rename `./example.env` to `./.env` and fill in the details
 * try the scripts below!

## Scripts

#### Run the app

`npm start`

The app uses Express, with the only other dependencies when running being body parser and dotenv, which stores environment variables.

#### Test the app

`npm test`

There are end to end tests in the `./test/**` folder and some integration/unit tests alongside the code modules themselves. The test runner is Mocha, using the inbuilt assert library for node, and supertest to run the app for e2e.

#### Lint the code

`npm run lint`

Using eslint with some basic configuration.

## Architecture

My first thought was that this at it's root is a transformation proxy, from the client side REST API to that of the origin server.

With that in mind I designed those two sides to be as decoupled as possible, so that any changes to the origin data or client side requirements could be made without having to refactor the whole code base.

* At the root of the solution is the Request class which makes the http requests to the origin server. 
* These requests are routed from 'origin services' which instantiate new requests to the desired endpoints and apply any headers needed. 
* 'Client services' interact with the origin services and apply any transformation of the response data to prepare it to meet the contract of the user facing API.
* Controllers route to the client services and are just responsible for applying the response http code, headers and body they recieve back.
* Finally are the path specific routers which have guards, e.g. for policy/clients routes that the Authorization header is present and well formatted.

Response message not provided by the origin server are in the l10n folder, this is to keep them out of the req/res flow and have them in a centralised place in case of a need to edit or translate.

## Thoughts on this Assesment

I've recently been using TypeScript rather than JS so used JSdoc to introduce types and apply them to functions where possible. 

The `GET /policy/:id` wasn't totally clear to me from [the spec](https://dare-nodejs-assessment.herokuapp.com/assessment-swagger/static/index.html#/policies/findByIdPolicies), I have assumed that this is effectively get a policy by it's id. If this was intended to be by clientId it could be simply changed as the service is already in place if needed.

All in all I enjoyed working on this and thanks for the opportunity.
