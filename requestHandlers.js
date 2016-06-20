var querystring = require("querystring");

function start(response, postData) {
    console.log("Request handler '/' was called.");
    var body = '<html><head><meta http-equiv="refresh" content="0; url=http://easysafety.esy.es/" /></head></html>';
    response.writeHead(200, {
        "Content-Type": "text/html"
    });
    response.write(body);
    response.end();
}

function locks(response, postData) {
    console.log("Request handler 'locks' was called.");

    var body = querystring.parse(postData).token;
    response.writeHead(200, {
        "Content-Type": "text/html"
    });
    response.write(body);
    response.end();
}

exports.start = start;
exports.locks = locks;