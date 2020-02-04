"use strict";

const http = require("http");
const httpStatus = require("http-status-codes");
const hostname = "127.0.0.1";
const port = 3000;
const app = http.createServer();            // server as an obj

const getJSONString = function (obj) {      // prettyprint obj
    return JSON.stringify(obj, null, 4);
}

app.on("request", function (req, res) {     // eventhandler for "request"
    let body = [];
    req.on("data", function (bodyData) {    // eventhandling for data reception
        body.push(bodyData);                // bodyData is an object
    });
    req.on("end", function () {             // eventhandling for end-of-data
        body = Buffer.concat(body).toString();
        console.log("Log: Request Body Contents: " + body);
    });

    console.log("Log: Method: " + req.method);
    console.log("Log: URL: " + getJSONString(req.url));
    console.log("Log: Headers:\n" + getJSONString(req.headers));
                                            // prep response header
    res.writeHead(httpStatus.OK, {
        "Content-Type": "text/html; charset=utf-8"
    });
                                            // prep response body
    let responseMsg = "<h1>Du klarede det!</h1>";
    responseMsg += "<p>Dataen er sendt</p>";
    res.write(responseMsg);                 // respond
    res.end();                              // sends response http
});

app.listen(port, hostname, function () {
    console.log(`Server running, and listening at http://${hostname}:${port}/`);
});

/*
*
* Node skriver ved GET requesten formens indhold i headerens URL. 
* Siden skal starte med file protocol, fordi serveren ikke har kendskab til andre filer end main.js,
* GET og POST bruges til at transportere data mellem serveren og klienten, men GET indsætter informatione
* i headeren, hvilket ikke er sikkert, da ens adgangskode ikke må læse af andre. 
* Ved at andende POST metoden bliver informationen placeret i body content, hvilket er mere sikkert
* 
*/