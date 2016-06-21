var http = require("http");
var url = require("url");
var port = process.env.PORT || 1337;

function start(route, handle) {
    function onRequest(request, response) {
        var postData = "";
        var pathname = url.parse(request.url).pathname;
        console.log("Request for " + pathname + " received.");

        request.setEncoding("utf8");
        
        request.on("data", function (chunk) {
            postData += chunk.toString();
        });
        request.on("end", function () {
            route(handle, pathname, response, postData);
        });


    }

    http.createServer(onRequest).listen(port);
    console.log("Server has started.");
}

exports.start = start;