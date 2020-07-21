# Node REST API Technical Test

## Architecture

My first thought was that this at it's root is a transformation proxy from the client side REST API to that of the origin server.

With that in mind I designed those two sides to be as decoupled as possible, so that any changes to the origin data or client side requirements could be made without having to refactor the whole code base.

* At the root of the solution is the Request class which makes the http requests to the origin server. 
* These requests are routed from 'origin services' which instantiate new requests to the desired endpoints and apply any headers needed. 
* 'Client services' interact with the origin services and apply any transformation of the response data to prepare it to meet the contract of the user facing API.
* Controllers route to the client services and are just responsible for applying the response http code, headers and body they recieve back.
* Finally are the path specific routers which have guards, e.g. for ploicy/clients routes that the Authorization header is present and well formatted.

## Scripts

###### Run the app

`npm start`

###### Test the app

`npm test`

###### Lint the code

`npm run lint`
