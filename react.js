import { Link } from "react-router-dom";
import FruitsAndVegetables from '../images/Fruits & Veggies.jpg';
import Eggs from '../images/Egg,meat,fish.jpg';
import MasalaSeasoning from '../images/Masala.jpg'
import OilGhee from '../images/Oil & Ghee.jpg';
import { useEffect, useState } from "react";
import { v4 as uuidv4 } from 'uuid';
import { useNavigate } from "react-router-dom";
import { ClipLoader } from "react-spinners";
let tempJson = {};
function GrocerySubCategory({setSearchedData}) {

    const [ackData,setAckData] = useState();
    const [catName,setCatName] = useState('');
    const [finalData,setFinalData] = useState([]);
    const [loader,setLoader] = useState(false);
    const navigate = useNavigate();
    var categoryItem = '';
    const uniqueId = uuidv4();
    const uniqueIdVal = uniqueId;
    const ackDataPrepare = async()=>{
      setLoader(true);
        console.log("catName",catName)
        //const uniqueId = uuidv4();
        const currentTime = new Date().toISOString();
        console.log(categoryItem,uniqueId)
        let tempJosn ={
            "context":
            {
              "domain":"ONDC:RET10",
                "action":"search",
                "country":"IND",
                "city":"std:0172",
                "core_version":"1.2.0",
                "bap_id":"api.aabglaunchpadindiademo.com",
                "bap_uri":"https://api.aabglaunchpadindiademo.com/bapl",
                "transaction_id":uniqueId,
                "message_id":"1655281254860",
                "timestamp":currentTime,
                "ttl":"PT30S"
            },
            "message":
            {
              "intent":
              {
                "category":
                {
                  "id":categoryItem
                },
                "fulfillment":
                {
                  "type":"Delivery"
                },
                "payment":
                {
                  "@ondc/org/buyer_app_finder_fee_type":"percent",
                  "@ondc/org/buyer_app_finder_fee_amount":"3"
                },
                "tags":
                [
                  {
                    "code":"bap_terms",
                    "list":
                    [
                      {
                        "code":"static_terms",
                        "value":""
                      },
                      {
                        "code":"static_terms_new",
                        "value":"https://github.com/ONDC-Official/NP-Static-Terms/buyerNP_BNP/1.0/tc.pdf"
                      },
                      {
                        "code":"effective_date",
                        "value":"2023-10-01T00:00:00.000Z"
                      }
                    ]
                  }
                ]
              }
            }
          }
          console.log(tempJosn)
          const response = await fetch("https://api.aabglaunchpadindiademo.com/bapl/search", {
            method: "POST",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(tempJosn)
            })
            const result = await response.json();
            console.log(result);
                if(result){
                  setTimeout(()=>{
                    console.log("timeout")
                    getGroceryItem(uniqueId);
                  },5000)
                   
                }


                setAckData(tempJosn);
            }
    const getGroceryItem = async(uniqueId) => {
      console.log("........uniqueId", uniqueId);
        try {
            const response = await fetch("https://api.aabglaunchpadindiademo.com/getOnSearchData", {
            //const response = await fetch("https://api.aabglaunchpadindiademo.com/getSearchDataManual", {
            
            method: "POST",
            headers: {
              'Content-Type': 'application/json'
            },
             body: JSON.stringify({
                 //"transaction_id": "3df395a9-c196-4678-a4d1-5eaf4f7df111"
                 "transaction_id": uniqueId
                
             })
            //body: JSON.stringify({
              //"category_id": categoryItem
              
         // })
          })
           
           const data = await response.json();
           if(data){
            setFinalData(data);
            setLoader(false);
            console.log("resultGetData==============="+JSON.stringify(data));
            console.log("Searched DATA=========================="+data);
            console.log("Searched DATA=========================="+JSON.stringify(data));
            setSearchedData(JSON.stringify(data))
            
            navigate("/grocery");
           }
           
           console.log("I am here");
         } catch (error) {
          setLoader(false);
           console.log(error);
         }

    }
    const getGroceryData = (category)=>{
        console.log("get data",category);
        categoryItem = category;
        console.log(categoryItem)
        setCatName(categoryItem);
        ackDataPrepare();
    }


    return(
        <>
       {
        loader && <div id="semiTransparenDiv"></div>   
       }    

            <div className='container-fluid page-container'> 
        <div className='page-title'>
            <h3>Welcome to DT Store</h3>
        </div>
            <div className="row home-container">
            <div className="col-md-3">
                    <div className="round-card">
                        <div className='card-content' onClick={()=>getGroceryData('Oil & Ghee')}>
                            <Link  className="" data-bs-dismiss="offcanvas">
                                <img src={OilGhee} className='' width={'100%'}/>
                            </Link>
                            
                        </div>
                    </div>
                    <div className='icon-title'><h5>Oil & Ghee</h5></div>
                </div>
                <div className="col-md-3">
                    <div className="round-card">
                        <div className='card-content' onClick={()=>getGroceryData('Fruits and Vegetables')}>
                            <Link  className="" data-bs-dismiss="offcanvas">
                                <img src={FruitsAndVegetables} className='' width={'100%'}/>
                            </Link>
                            
                        </div>
                    </div>
                    <div className='icon-title'><h5>Fruits and Vegetables</h5></div>
                </div>
                <div className="col-md-3">
                    <div className="round-card">
                        <div className='card-content' onClick={()=>getGroceryData('Eggs, Meat & Fish')}>
                            <Link  className="" data-bs-dismiss="offcanvas">
                                <img src={Eggs} className='' width={'100%'}/>
                            </Link>
                            
                        </div>
                    </div>
                    <div className='icon-title'><h5>Eggs, Meat & Fish </h5></div>
                </div>
                <div className="col-md-3">
                    <div className="round-card">
                        <div className='card-content' onClick={()=>getGroceryData('Masala & Seasoning')}>
                            <Link  className="" data-bs-dismiss="offcanvas">
                                <img src={MasalaSeasoning} className='' width={'100%'}/>
                            </Link>
                            
                        </div>
                    </div>
                    <div className='icon-title'><h5>Masala & Seasoning</h5></div>
                </div>
                
                
            </div> 
      </div>
        </>
    )
}
export default GrocerySubCategory;
