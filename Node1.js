const getCustomerBill = (req, res, next) => {
    res.locals.SORCOLLECTION=CONSTANTS.COLLECTION_NAME;
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return handleValidationError(req,res, errors);
    }

    const { msisdn } = req.params;
    let { fields, noOfRecords } = req.query;
    fields = getBillFilterFields(fields);

    if (fields) {
        handlers.getRecodsByField(
            res,
            msisdn,
            fields,
            callbackHandler(req, res, next)
        );
    } else {
        handlers.getCustomerBill(
            res,
            msisdn,
            noOfRecords,
            callbackHandler(req, res, next)
        );
    }
};

const callbackHandler = (req, res, next) => {
    const callback = (err, result) => {
        if (result && result[0] ) {
            dbRequestDurationMetrics(
                req,
                res,
                CONSTANTS.API_URI.v1.CRUD_CUSTOMERBILL
            );
                result = result[0];
                result.msisdn = parseInt(result.msisdn, 10);
                if(!result.amountDue){
                    result.amountDue= undefined;
                    result.remainingAmount= undefined;
                }
            res.locals.responseBody = result;
            httpMetricsOptions(req, res, CONSTANTS.API_URI.v1.CRUD_CUSTOMERBILL);
            next();
        } else {
            res.locals.MongoDBTimeTaken = Utils.getEpochTime(res.locals.startDBTime);
            let errorObj;
            if(!result){
                err=err.errmsg?err.errmsg:err;
                errorObj = buildCustomErrorObject('',err);
            }else{
                errorObj = buildCustomErrorObject(CONSTANTS.NO_RECORDS_FOUND,err);
            }
            errorCounterMetrics(req, CONSTANTS.API_URI.v1.CRUD_CUSTOMERBILL);
            handleApiError(req,res, errorObj);
        }
    };
    return callback;
};
