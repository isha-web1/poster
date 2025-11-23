const response = (res, httpStatusCode, message, data = null) => {
    let statusType;

    // 1. Determine the status string based on the HTTP status code range
    if (httpStatusCode >= 200 && httpStatusCode < 300) {
        statusType = 'success';
    } else if (httpStatusCode >= 400 && httpStatusCode < 500) {
        
        statusType = 'fail';
    } else {
        // Use 'error' for 5xx server errors or unhandled exceptions
        statusType = 'error';
    }

    const responseObject = {
        // 2. Map HTTP status to a semantic JSON status
        status: statusType, 
        
        // 3. Include a descriptive message
        message: message, 
        
        // 4. Include payload data (null for errors or status 204 No Content)
        data: data
    };

    // 5. Use the provided HTTP status code in the response header
    return res.status(httpStatusCode).json(responseObject);
};

module.exports = response;