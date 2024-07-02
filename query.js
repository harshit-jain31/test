const queryHandler = {
    getRecodsByField(res, msisdn, fields, callback) {
        const plainMsisdn=msisdn;
        msisdn = checkAndEncrypt(msisdn);
        let fieldsObj = {};
        fields.forEach(function(field) {
            let buildObj;
            if(fields.includes(CONSTANTS.AMOUNTDUE)){
                 buildObj = { amountDue: {
                    value: {
                        $round: [
                            {
                                $toDouble:
                                    '$customerBillingProfile.amountDue.value'
                            },
                            2
                        ]
                    },
                    unit: '$customerBillingProfile.amountDue.unit'
                }     
            };
        }else
            {
                buildObj = { [field]: `$customerBillingProfile.${field}` }; 
            }
           
            fieldsObj = { ...fieldsObj, ...buildObj };
        });

        res.locals.startDBTime = process.hrtime();
        subscriberModel.aggregate(
            [
                { $match: { msisdn } },
                {
                    $project: {
                        _id: 0,
                        msisdn: plainMsisdn, 
                        ...fieldsObj
                    }
                }
            ],
            (err, result) => {
                if (result && result[0]) {
                    result=decryptCreditLimit(result);
                    if (result[0].cycleCode) {
                        result[0].cycleCode = parseInt(result[0].cycleCode);
                    }
                    if (result[0].cycleCode) {
                        result[0].cycleCode = parseInt(result[0].cycleCode);
                    }
                    if (result[0].agreementNumber) {
                        result[0].agreementNumber = parseInt(result[0].agreementNumber);
                    }
                    if (result[0].cycleInstance) {
                        result[0].cycleInstance = parseInt(
                            result[0].cycleInstance
                        );
                    }
                    if (result[0].cycleYear) {
                        result[0].cycleYear = parseInt(result[0].cycleYear);
                    }
                    callback(null, result);
                } else {
                    callback(err, result);
                }
            }
        );
    }
}
