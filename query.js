const queryHandler = {
    getCustomerBill(res, msisdn, noOfRecords, callback) {
        const plainMsisdn=msisdn;
        msisdn = checkAndEncrypt(msisdn);
        noOfRecords = noOfRecords || process.env.BILL_NO_OF_RECORDS;
        res.locals.startDBTime = process.hrtime();
        return subscriberModel.aggregate(
            [
                { $match: { msisdn } },
                {
                    $project: {
                        _id: 1,
                        msisdn: 1,
                        customerBillingProfile: 1,
                        partyBill: 1,
                        partyPayment: {
                            $filter: {
                                input: '$partyPayment',
                                as: 'pp',
                                cond: {
                                    $gt: [
                                        { $toDate: '$$pp.paymentDate' },
                                        {
                                            $toDate:
                                                '$customerBillingProfile.billDate'
                                        }
                                    ]
                                }
                            }
                        }
                    }
                },
                { $unwind: '$partyBill' },
                { $sort: { 'partyBill.billDate': -1 } },
                {
                    $group: {
                        _id: '$_id',
                        billInfo: {
                            $first: {
                                msisdn: '$msisdn',
                                cbp: '$customerBillingProfile',
                                paymentAmount: {
                                    $sum: {
                                        $map: {
                                            input: '$partyPayment',
                                            as: 'pp',
                                            in: {
                                                $cond: {
                                                    if:
                                                        '$$pp.totalAmount.value',
                                                    then: {
                                                        $toDouble:
                                                            '$$pp.totalAmount.value'
                                                    },
                                                    else: 0
                                                }
                                            }
                                        }
                                    }
                                }
                            }
                        },
                        partyBill: {
                            $push: '$partyBill'
                        }
                    }
                },
                {
                    $project: {
                        _id: 0,
                        msisdn: '$billInfo.msisdn',
                        cbp: '$billInfo.cbp',
                        previousBillAmount: {
                            $arrayElemAt: ['$partyBill.amount', 1]
                        },
                        amountDue: {
                            $cond: {
                                if: {
                                    $and: [
                                        '$billInfo.cbp.amountDue.value',
                                        '$billInfo.paymentAmount'
                                    ]
                                },
                                then: {
                                    value: {
                                        $round: [
                                            {
                                                $subtract: [
                                                    {
                                                        $toDouble:
                                                            '$billInfo.cbp.amountDue.value'
                                                    },
                                                    {
                                                        $toDouble:
                                                            '$billInfo.paymentAmount'
                                                    }
                                                ]
                                            },
                                            2
                                        ]
                                    },
                                    unit: '$billInfo.cbp.amountDue.unit'
                                },
                                else: {
                                    $cond: {
                                        if: '$billInfo.cbp.amountDue.value',
                                        then: {
                                            value: {
                                                $round: [
                                                    {
                                                        $toDouble:
                                                            '$billInfo.cbp.amountDue.value'
                                                    },
                                                    2
                                                ]
                                            },

                                            unit: '$billInfo.cbp.amountDue.unit'
                                        },
                                        else: false
                                    }
                                }
                            }
                        },
                        partyBill: {
                            $slice: ['$partyBill', Number(noOfRecords)]
                        }
                    }
                },
                {
                    $project: {
                        msisdn: plainMsisdn,
                        billingAccountNo: {
                            $toDouble: '$cbp.billingAccountNo'
                        },
                        creditLimit: '$cbp.creditLimit',
                        billLanguage: '$cbp.billLanguage',
                        partyBillPresentationMedia:
                            '$cbp.partyBillPresentationMedia',
                        billDate: {
                            $dateFromString: {
                                dateString: '$cbp.billDate'
                            }
                        },
                        nextBillDate: {
                            $dateFromString: {
                                dateString: '$cbp.nextBillDate'
                            }
                        },
                        remainingAmount: '$amountDue',
                        amountDue: '$amountDue',
                        paymentDueDate: {
                            $dateFromString: {
                                dateString: '$cbp.paymentDueDate'
                            }
                        },
                        previousBillAmount: {
                            value: {
                                $round: [
                                    { $toDouble: '$previousBillAmount.value' },
                                    2
                                ]
                            },
                            unit: '$previousBillAmount.unit'
                        },
                        partyBill: {
                            $map: {
                                input: '$partyBill',
                                as: 'pb',
                                in: {
                                    billNo: '$$pb.billNo',
                                    billDate: {
                                        $dateFromString: {
                                            dateString: '$$pb.billDate'
                                        }
                                    },
                                    amount: {
                                        value: {
                                            $round: [
                                                {
                                                    $toDouble:
                                                        '$$pb.amount.value'
                                                },
                                                2
                                            ]
                                        },
                                        unit: '$$pb.amount.unit'
                                    },
                                    previousAmountDue : {
                                        value: {
                                            $round: [
                                                {
                                                    $toDouble:
                                                        '$$pb.previousAmountDue.value'
                                                },
                                                2
                                            ]
                                        },
                                        unit: '$$pb.previousAmountDue.unit'
                                    },
                                    totalAmountDue: {
                                        value: {
                                            $round: [
                                                {
                                                    $toDouble:
                                                        '$$pb.totalAmountDue.value'
                                                },
                                                2
                                            ]
                                        },
                                        unit: '$$pb.totalAmountDue.unit'
                                    },
                                    financialCharges: '$$pb.financialCharges'
                                }
                            }
                        }
                    }
                }
            ],
           (err,result)=>{
               if (result){
                result=decryptCreditLimit(result);
                callback(null,result);
               }else{
                callback(err,null);
               }

           }
        );
    }
}
