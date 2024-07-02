const getNextBill = (req, res, next) => {
    res.locals.SORCOLLECTION = CONSTANTS.UTILITY_HISTORY_COLLECTION_NAME;
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return handleValidationError(req, res, errors);
    }
    handlers.getNextBill(res, callbackHandler(req, res, next));
};

const callbackHandler = (req, res, next) => {
    const callback = (err, result) => {
        if (result) {
            dbRequestDurationMetrics(
                req,
                res,
                CONSTANTS.API_URI.v1.GET_NEXTBILL
            );
            res.locals.responseBody = result;
            httpMetricsOptions(req, res, CONSTANTS.API_URI.v1.GET_NEXTBILL);
            next();
        } else {
            res.locals.MongoDBTimeTaken = Utils.getEpochTime(
                res.locals.startDBTime
            );
            let errorObj = buildErrorObject(err);
            errorCounterMetrics(req, CONSTANTS.API_URI.v1.GET_NEXTBILL);
            handleApiError(req, res, errorObj);
        }
    };
    return callback;
};
