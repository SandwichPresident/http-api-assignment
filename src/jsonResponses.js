const respond = (request, response, status, object, acceptedTypes) => {
    if (acceptedTypes.includes('text/xml')) {
        let responseXML = '<response>';
        responseXML += `<message>${object.message}</message>`;
        if (object.id) {
            responseXML += `<id>${object.id}</id>`;
        }
        responseXML += '</response>';

        response.writeHead(status, { 'Content-Type': 'text/xml' });
        response.write(responseXML);
        return response.end();
    }

    const responseJSON = JSON.stringify(object);
    response.writeHead(status, { 'Content-Type': 'application/json' });
    response.write(responseJSON);
    return response.end();
};

const getSuccess = (request, response, acceptedTypes) => {
    const responseObj = {
        message: 'This is a successful response',
    };
    respond(request, response, 200, responseObj, acceptedTypes);
};

const getBadRequest = (request, response, params, acceptedTypes) => {
    const responseObj = {
        message: 'This request has the required parameters',
    };

    if (!params.valid || params.valid !== 'true') {
        responseObj.message = 'Missing valid query parameter set to true';
        responseObj.id = 'badRequest';
        return respond(request, response, 400, responseObj, acceptedTypes);
    }

    return respond(request, response, 200, responseObj, acceptedTypes);
};

const getUnauthorized = (request, response, params, acceptedTypes) => {
    const responseObj = {
        message: 'You have successfully viewed the content.',
    };

    if (!params.loggedIn || params.loggedIn !== 'yes') {
        responseObj.message = 'Missing loggedIn query parameter set to yes';
        responseObj.id = 'unauthorized';
        return respond(request, response, 401, responseObj, acceptedTypes);
    }

    return respond(request, response, 200, responseObj, acceptedTypes);
};

const getForbidden = (request, response, acceptedTypes) => {
    const responseObj = {
        message: 'You do not have access to this content.',
        id: 'forbidden',
    };
    respond(request, response, 403, responseObj, acceptedTypes);
};

const getInternal = (request, response, acceptedTypes) => {
    const responseObj = {
        message: 'Internal Server Error. Something went wrong.',
        id: 'internalError',
    };
    respond(request, response, 500, responseObj, acceptedTypes);
};

const getNotImplemented = (request, response, acceptedTypes) => {
    const responseObj = {
        message: 'A get request for this page has not been implemented yet. Check again later for updated content.',
        id: 'notImplemented',
    };
    respond(request, response, 501, responseObj, acceptedTypes);
};

const getNotFound = (request, response, acceptedTypes) => {
    const responseObj = {
        message: 'The page you are looking for was not found.',
        id: 'notFound',
    };
    respond(request, response, 404, responseObj, acceptedTypes);
};

module.exports = {
    getSuccess,
    getBadRequest,
    getUnauthorized,
    getForbidden,
    getInternal,
    getNotImplemented,
    getNotFound,
};