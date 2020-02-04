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
    console.log("Log: Received an incoming request!");
    console.log("Log: Method: " + req.method);
    console.log("Log: URL: " + getJSONString(req.url));
    console.log("Log: Headers:\n" + getJSONString(req.headers));
                                            // prep response header
    res.writeHead(httpStatus.OK, {
        "Content-Type": "text/html; charset=utf-8"
    });
                                            // prep response body
    let responseMsg = "<h1>Kilroy was here!</h1>";
    responseMsg += "<p><kbd>myg52</kbd> at your disposal</p>";
    res.write(responseMsg);                 // respond
    res.end();                              // sends response http
});

app.listen(port, hostname, function () {
    console.log(`Server running, and listening at http://${hostname}:${port}/`);
   
});

/*
*
* Node skriver efter URL'ens rod, det kan skriver i URL'en.
* Den er ikke afhængig af, hvad man skriver i html navnet eller efter ?.
* 
*/
