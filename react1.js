import { useEffect, useState } from 'react';
import '../App.css';
import { v4 as uuidv4 } from 'uuid';
import { useNavigate } from 'react-router-dom';

function Checkout({ itemData, setPaymentData }) {
    console.log("checkout", itemData);
    const [checkoutItem, setCheckoutItem] = useState([]);
    const [loader, setLoader] = useState(false);
    const [isChecked, setIsChecked] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        setLoader(true);
        setTimeout(() => {
            getCheckOutList();
        }, 6000);
        getCheckOutList();
    }, []);

    const getCheckOutList = async () => {
        setLoader(true);
        try {
            const response = await fetch("https://api.aabglaunchpadindiademo.com/getCartDetail", {
                method: "POST",
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    "transaction_id": itemData?.transaction_id,
                    "action": "on_select"
                })
            });
            const result = await response.json();
            if (result) {
                console.log("result", result);
                setCheckoutItem(result?.item);
                setTimeout(() => {
                    setLoader(false);
                }, 3000);
            }
        } catch (error) {
            console.log(error);
            setLoader(false);
        }
    }

    const handleQuantityChange = (index, delta) => {
        const updatedItems = [...checkoutItem];
        updatedItems[index].data.message.order.quote.breakup[0]['@ondc/org/item_quantity'].count += delta;
        setCheckoutItem(updatedItems);
        // Recalculate total price when quantity changes
        totalPriceCount();
    }

    const totalPriceCount = () => {
        let totalPrice = 0;
        checkoutItem.forEach(item => {
            const price = item?.data?.message?.order?.quote?.price?.value;
            const quantity = item?.data?.message?.order?.quote?.breakup[0]['@ondc/org/item_quantity']?.count;
            totalPrice += price * quantity;
        });
        return totalPrice;
    }

    const placeOrderFn = async () => {
        setLoader(true);
        let messageId = uuidv4();
        const currentTime = new Date().toISOString();
        const url = 'https://api.aabglaunchpadindiademo.com/bapl/init';
        let params = {
            "context": {
                "domain": "ONDC:RET10",
                "country": "IND",
                "city": "std:0172",
                "action": "init",
                "core_version": "1.2.0",
                "bap_id": "api.aabglaunchpadindiademo.com",
                "bap_uri": "https://api.aabglaunchpadindiademo.com/bapl",
                "bpp_uri": "https://api.aabglaunchpadindiademo.com/bppl",
                "transaction_id": itemData?.transaction_id,
                "message_id": messageId,
                "timestamp": currentTime,
                "bpp_id": "api.aabglaunchpadindiademo.com",
                "ttl": "PT30S"
            },
            "message": {
                "order": {
                    "provider": {
                        "id": checkoutItem[0]?.data?.message?.order?.provider?.id,
                        "locations": [
                            {
                                "id": checkoutItem[0]?.data?.message?.order?.provider?.locations[0].id
                            }
                        ]
                    },
                    "items": [
                        {
                            "id": checkoutItem[0]?.data?.message?.order?.items[0]?.id,
                            "quantity": {
                                "count": checkoutItem[0]?.data?.message?.order?.quote?.breakup[0]['@ondc/org/item_quantity']?.count,
                            },
                            "location_id": checkoutItem[0]?.data?.message?.order?.provider?.locations[0].id,
                            "tags": [
                                {
                                    "code": "type",
                                    "list": [
                                        {
                                            "code": "type",
                                            "value": "item"
                                        }
                                    ]
                                }
                            ],
                            "fulfillment_id": "F1"
                        }
                    ],
                    "billing": {
                        "address": {
                            "building": "1",
                            "city": "Kharar",
                            "state": "Punjab",
                            "country": "IND",
                            "area_code": "140301",
                            "locality": "NH 205A",
                            "name": "Akshay"
                        },
                        "phone": "8983796135",
                        "name": "Akshay",
                        "email": "vr-admin@mailinator.com",
                        "created_at": currentTime,
                        "updated_at": currentTime
                    },
                    "fulfillments": [
                        {
                            "id": "F1",
                            "type": "Delivery",
                            "end": {
                                "contact": {
                                    "email": "vr-admin@mailinator.com",
                                    "phone": "8983796135"
                                },
                                "location": {
                                    "gps": "30.750455700395456,76.64175219098999",
                                    "address": {
                                        "building": "1",
                                        "city": "Kharar",
                                        "state": "Punjab",
                                        "country": "IND",
                                        "area_code": "140301",
                                        "locality": "NH 205A",
                                        "name": "Akshay"
                                    }
                                }
                            }
                        }
                    ]
                }
            }
        }
        console.log("befpreee", params)
        try {
            const response = await fetch(url, {
                method: "POST",
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(params)
            })
            const result = await response.json();
            if (result) {
                console.log("result placeorder", result);
                setTimeout(() => {
                    getBillingDetails(itemData?.transaction_id)
                }, 5000)
            }
        } catch (error) {
            console.log("error", error)
        }
    }

    const getBillingDetails = async (messageId) => {
        try {
            console.log("billlll", messageId)
            const url = 'https://api.aabglaunchpadindiademo.com/getCartDetail';
            const response = await fetch(url, {
                method: "POST",
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    "transaction_id": messageId,
                    "action": "on_init"
                })
            })
            const result = await response.json();
            if (result) {
                setLoader(false);
                console.log("result billing", result);
                setPaymentData(result?.item)
                navigate('/paymentDetails')
            }
        } catch (error) {
            setLoader(false);
            console.log("error", error)
        }
    }

    const handleCheckboxChange = () => {
        setIsChecked(!isChecked); // Toggle the checked state
    };

    return (
        <>
            {loader && <div id="semiTransparenDiv"></div>}
            <div className="chekout-container">
                <div className='page-title'>
                    <h3>Shopping Cart</h3>
                </div>
                <div className='shopping-bag-container'>
                    <div className='bag-title'>
                        <label>Your Bag (1 item)</label>
                    </div>
                </div>
                <div className='bag-item'>
                    <table className="table">
                        <thead>
                            <tr>
                                <th scope="col">Item</th>
                                <th scope="col">Price</th>
                                <th scope="col">Quantity</th>
                                <th scope="col">Delivery Time</th>
                                <th scope="col">Total</th>
                            </tr>
                        </thead>
                        <tbody>
                            {checkoutItem?.map((item, index) => (
                                <tr key={index + 1}>
                                    <td style={{ textAlign: '', width: '400px' }}>
                                        <span>{item?.data?.message?.order?.quote?.breakup[0]?.title}</span>
                                    </td>
                                    <td>{item?.data?.message?.order?.quote?.breakup[0].item?.price?.currency} {item?.data?.message?.order?.quote?.breakup[0].item?.price?.value}</td>
                                    <td>
                                        <button onClick={() => handleQuantityChange(index, -1)} disabled={item?.data?.message?.order?.quote?.breakup[0]['@ondc/org/item_quantity']?.count <= 1}>-</button>
                                        {item?.data?.message?.order?.quote?.breakup[0]['@ondc/org/item_quantity']?.count}
                                        <button onClick={() => handleQuantityChange(index, 1)}>+</button>
                                    </td>
                                    <td>{item?.data?.message?.order?.fulfillments[0]['@ondc/org/category']}</td>
                                    <td onLoad={totalPriceCount}>{item?.data?.message?.order?.quote?.price?.currency} {item?.data?.message?.order?.quote?.price?.value * item?.data?.message?.order?.quote?.breakup[0]['@ondc/org/item_quantity']?.count} </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                    <div className='billingAdress mx-4'>
                        <p>Please Select the Billing address :</p>
                        <div className="card" style={{ 'width': '18rem' }}>
                            <div className="form-check mx-3">
                                <input className="form-check-input" type="checkbox" checked={isChecked}
                                    onChange={handleCheckboxChange} />
                            </div>
                            <div className="card-body">
                                <h5 className="card-title">Shipping Address</h5>
                                <h6 className="card-subtitle my-2">Name: Akshay</h6>
                                <h6 className="card-subtitle my-2">Mobile: 8983796135</h6>
                                <div className='addresscontainer'>
                                    <p>NH 205A, 1</p>
                                    <p>Kharar, Punjab</p>
                                    <p>140301</p>
                                    <p>INDIA</p>
                                    <p>vr-admin@mailinator.com</p>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className='bag-footer_section'>
                        <div className='cart-footer-btn'>
                            <button type='submit' className='btn card-btn' onClick={placeOrderFn} disabled={!isChecked}>Place Order</button>
                        </div>
                    </div>
                </div>
            </div>
            <div className="modal fade" id="cartModal" tabIndex="-1" aria-labelledby="cartModal" aria-hidden="true">
                <div className="modal-dialog modal-dialog-centered modal-dialog-scrollable">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title" id="cartModal">Your Shopping Bag</h5>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close">
                                <svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 16 16' fill='#fff'><path d='M.293.293a1 1 0 011.414 0L8 6.586 14.293.293a1 1 0 111.414 1.414L9.414 8l6.293 6.293a1 1 0 01-1.414 1.414L8 9.414l-6.293 6.293a1 1 0 01-1.414-1.414L6.586 8 .293 1.707a1 1 0 010-1.414z' /></svg>
                            </button>
                        </div>
                        <div className="modal-body">
                            ...
                        </div>
                        <div className="modal-footer">
                            <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Cancel</button>
                            <button type="button" className="btn acc-btn">Checkout</button>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Checkout;
