import { useEffect, useState } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
function ProductDetails({productDetail,setItemData}) {
    const [itemCount,setItemCount] = useState(1);
    const [product,setProduct] = useState();
    const [loader,setLoader] = useState(false);
    const navigate = useNavigate();
    console.log("geting prdct details in comp",productDetail);

    useEffect(()=>{
        setProduct(productDetail)
    },[])
    const increaseCountItem = ()=> {
        setItemCount(itemCount+1)
    }
    const decreaseCountItem = ()=> {
        if(itemCount>0){
            setItemCount(itemCount-1)
        }
        
    }
    const addToCart = async()=>{
        let prdMessageId = uuidv4();
        let prdTransactionId = uuidv4();
        const currentTime = new Date().toISOString();
        console.log("countItem",itemCount);
        console.log("product?.id",product?.product?.id);
        console.log("location_id",product?.product?.location_id);
        console.log("providerId",product?.providerId);
        console.log("prdMessageId",prdMessageId);
        console.log("prdTransactionId",prdTransactionId)
        
        setLoader(true);
        let addCartData = {
            "context": {
                "domain": "ONDC:RET10",
                "country": "IND",
                "city": "std:0172",
                "action": "select",
                "core_version": "1.2.0",
                "bap_id": "api.aabglaunchpadindiademo.com",
                "bap_uri": "https://api.aabglaunchpadindiademo.com/bapl",
                "bpp_uri": "https://ref-app-seller-staging-v2.ondc.org",
                "transaction_id": prdTransactionId,
                "message_id": prdMessageId,
                "timestamp": currentTime,
                "bpp_id": "ref-app-seller-staging-v2.ondc.org",
                "ttl": "PT30S"
            },
            "message": {
                "order": {
                    "items": [
                        {
                            "id": product?.product?.id,
                            "quantity": {
                                "count": itemCount
                            },
                            "location_id": product?.product?.location_id,
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
                            ]
                        }
                    ],
                    "provider": {
                        "id": product?.providerId,
                        "locations": [
                            {
                                "id": product?.product?.location_id
                            }
                        ]
                    },
                    "fulfillments": [
                        {
                            "end": {
                                "location": {
                                    "gps": "30.750455700395456,76.64175219098999",
                                    "address": {
                                        "area_code": "140301"
                                    }
                                }
                            }
                        }
                    ]
                }
            }
        }
        try {
        const response = await fetch("https://api.aabglaunchpadindiademo.com/bapl/select", {
            method: "POST",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(addCartData)
            })
            const result = await response.json();
            if(result){
                console.log("result",result);
                setLoader(false);
                // toast.success('Your Item added Successfully!', {
                //     position: "top-center",
                //     autoClose: 1000,
                //     hideProgressBar: true,
                //     closeOnClick: true,
                //     pauseOnHover: true,
                //     draggable: true,
                //     progress: undefined,
                //     theme: "colored",
                    
                // });
                navigate("/chekout")
            }

        setItemData({transaction_id:prdTransactionId,message_id:prdMessageId})
        console.log("product",product)
        console.log("product",product?.product?.providerId)
        console.log("object prepare",addCartData)
        
        }catch(error){
            console.log(error);
            setLoader(false);
        }
    }

    return(
        <>
        {
        loader && <div id="semiTransparenDiv"></div>   
       } 
         <ToastContainer />

        
                <div className="productDetails-container">
                <h4 className='page-title'>Product Details</h4>
                <div className="row">
                    <div className="col-5">
                        <div className="pdct-img-container">
                            <img src={product?.product?.descriptor?.symbol} width={'100%'} className='pdct-img' />
                        </div>
                    </div>
                    <div className="col-7">
                        <div className='pdct-details'>
                            <div className='pdct-title'>{product?.product?.descriptor?.short_desc}</div>
                            <div className='pdct-descp'>
                                <p className='pdct-decp'>
                                    {product?.product?.descriptor?.long_desc}
                                </p>
                                <p className='pdct-price'>
                                    <label className='pdct-final-price'>{product?.product?.price?.currency} {product?.product?.price?.value}</label>
                                    {/* <label className='pdct-price-cut'>MRP <del>₹5,500</del></label>
                                    <label className='discount-offer'>38% OFF</label> */}
                                </p>
                                <p className='pdct-sold'>
                                    <label>Sold By:</label>
                                    <label className='pdct-solderName'>{product?.product['@ondc/org/statutory_reqs_packaged_commodities']?.manufacturer_or_packer_name}</label>
                                </p>
                                <p className='pdct-sold'>
                                    <label>Customer care:</label>
                                    <label className='pdct-solderName'>{product?.product['@ondc/org/contact_details_consumer_care']}</label>
                                </p>
                            </div>
                            <div className='pdct-fooler'>
                                <div class="btn-group" role="group" aria-label="Basic outlined example">
                                    <button type="button" class="btn acn-btn" onClick={decreaseCountItem}>-</button>
                                    
                                    <button type="button" class="btn ">{itemCount}</button>
                                    <button type="button" class="btn acn-btn" onClick={increaseCountItem}>+</button>
                                </div>
                                <button type="button" class="btn card-btn" onClick={addToCart}>Order</button>
                            </div>
                        </div>
                    </div>

                </div>
            </div>
          
           
        </>
    )
}
export default ProductDetails;
