const getUpcomingBill = (req, res, next) => {
    res.locals.SORCOLLECTION = CONSTANTS.UTILITY_HISTORY_COLLECTION_NAME;
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return handleValidationError(req, res, errors);
    }
    const { msisdn } = req.params;
    handlers.getUpcomingBill(
        res,
        msisdn,
        callbackHandler(req, res, next)
    );
};

const callbackHandler = (req, res, next) => {
    const callback = (err, result) => {
        if (result && result.length) {
            dbRequestDurationMetrics(
                req,
                res,
                CONSTANTS.API_URI.v1.GET_UPCOMINGBILL
            );
            res.locals.responseBody = result;
            httpMetricsOptions(
                req,
                res,
                CONSTANTS.API_URI.v1.GET_UPCOMINGBILL
            );
            next();
        } else {
            res.locals.MongoDBTimeTaken = Utils.getEpochTime(res.locals.startDBTime);
            let errorObj = buildErrorObject(err);
            errorCounterMetrics(req, CONSTANTS.API_URI.v1.GET_UPCOMINGBILL);
            handleApiError(req, res, errorObj);
        }
    };
    return callback;
};
