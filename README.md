# aquaria-api

## Tools used

* Nodejs
* Express
* MongoDB
* Mongoose
* BodyParser

## How to use

Make sure you have NodeJS and MongoDB installed in your system

First run `npm install` on the project directory. 

To start a local server, in the project directory you can run: `node index.js` and it should prompt `Server started at :4000(port). Mongodb connection succeeded`.

### Notes:

CORS is enabled on port:3007 on default, it is also the default port for the [aquaria-ui](https://github.com/zyxnowell/aquaria-ui) to run.  

If you don't wish to run the client app on port 3007 you can update the port specified on the index.js file of the api.

