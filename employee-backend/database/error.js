export const createError = (statusCode, message) => {
    const error = new Error();
    error.message = message;
    error.StatusCode = statusCode;
    return error;
};