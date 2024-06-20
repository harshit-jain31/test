const getBillHistory = (req, res, next) => {
    res.locals.SORCOLLECTION = CONSTANTS.UTILITY_HISTORY_COLLECTION_NAME;
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return handleValidationError(req, res, errors);
    }
    const { msisdn } = req.params;
    let { category } = req.query;
    const reqQuery = {
        category: category && category.toUpperCase()
    };
    handlers.getBillHistory(
        res,
        msisdn,
        reqQuery,
        callbackHandler(req, res, next)
    );
};
 
const callbackHandler = (req, res, next) => {
    const callback = (err, result) => {
        if (result && result.length) {
            dbRequestDurationMetrics(
                req,
                res,
                CONSTANTS.API_URI.v1.GET_BILLHISTORY
            );
            let { category } = req.query;
            res.locals.responseBody =
                category &&
                category.toUpperCase() == CONSTANTS.UNIQUEACCOUNT_CATEGORY
                    ? result[0]
                    : result;
            httpMetricsOptions(req, res, CONSTANTS.API_URI.v1.GET_BILLHISTORY);
            next();
        } else {
            res.locals.MongoDBTimeTaken = Utils.getEpochTime(
                res.locals.startDBTime
            );
            let errorObj = buildErrorObject(err);
            errorCounterMetrics(req, CONSTANTS.API_URI.v1.GET_BILLHISTORY);
            handleApiError(req, res, errorObj);
        }
    };
    return callback;
};
