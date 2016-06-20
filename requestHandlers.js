var querystring = require("querystring");

function start(response, postData) {
    console.log("Request handler '/' was called.");
    response.writeHead(301, {
        Location: 'http://easysafety.esy.es'
    });
    response.end();
}

function locks(response, postData) {
    console.log("Request handler 'locks' was called.");

    var body = "postData: " + JSON.stringify(querystring.parse(postData));
    response.writeHead(200, {
        "Content-Type": "text/html"
    });
    response.write(body);
    response.end();
}

exports.start = start;
exports.locks = locks;