const http = require('http');
const url = require('url');
const htmlHandler = require('./htmlResponses.js');
const responseHandler = require('./jsonResponses.js');

const port = process.env.PORT || process.env.NODE_PORT || 3000;

const onRequest = (request, response) => {
    const parsedUrl = url.parse(request.url, true);
    const acceptedTypes = request.headers.accept ? request.headers.accept.split(',') : [];

    if (parsedUrl.pathname === '/') {
        htmlHandler.getIndex(request, response);
    } else if (parsedUrl.pathname === '/style.css') {
        htmlHandler.getCSS(request, response);
    } else if (parsedUrl.pathname === '/success') {
        responseHandler.getSuccess(request, response, acceptedTypes);
    } else if (parsedUrl.pathname === '/badRequest') {
        responseHandler.getBadRequest(request, response, parsedUrl.query, acceptedTypes);
    } else if (parsedUrl.pathname === '/unauthorized') {
        responseHandler.getUnauthorized(request, response, parsedUrl.query, acceptedTypes);
    } else if (parsedUrl.pathname === '/forbidden') {
        responseHandler.getForbidden(request, response, acceptedTypes);
    } else if (parsedUrl.pathname === '/internal') {
        responseHandler.getInternal(request, response, acceptedTypes);
    } else if (parsedUrl.pathname === '/notImplemented' || parsedUrl.pathname === '/notimplemented') {
        responseHandler.getNotImplemented(request, response, acceptedTypes);
    } else {
        responseHandler.getNotFound(request, response, acceptedTypes);
    }
};

http.createServer(onRequest).listen(port, () => {
    console.log(`Listening on 127.0.0.1:${port}`);
});