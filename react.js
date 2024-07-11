function ElectronicSubCategory({setSearchedData}) {
    const [ackData,setAckData] = useState();
    const [catName,setCatName] = useState('');
    const [finalData,setFinalData] = useState([]);
    const [loader,setLoader] = useState(false);
    const navigate = useNavigate();
    var categoryItem = '';

    const ackDataPrepare = async()=>{
      setLoader(true);
        console.log("catName",catName)
        const uniqueId = uuidv4();
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
                "timestamp":"2023-02-19T15:28:00.000Z",
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
        try {
            //const response = await fetch("https://api.aabglaunchpadindiademo.com/getSearchData", {
            const response = await fetch("https://api.aabglaunchpadindiademo.com/getSearchDataManual", {
            
            method: "POST",
            headers: {
              'Content-Type': 'application/json'
            },
            // body: JSON.stringify({
            //     "transaction_id": uniqueId
                
            // })
            body: JSON.stringify({
              "category_id": categoryItem
              
          })
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
                        <div className='card-content' onClick={()=>getGroceryData('Headset')}>
                            <Link  className="" data-bs-dismiss="offcanvas">
                                <img src={Headset} className='' width={'100%'}/>
                            </Link>
                            
                        </div>
                    </div>
                    <div className='icon-title'><h5>Headset</h5></div>
                </div>
            <div className="col-md-3">
                    <div className="round-card">
                        <div className='card-content' onClick={()=>getGroceryData('Mobile Phone')}>
                            <Link  className="" data-bs-dismiss="offcanvas">
                                <img src={MobilePhone} className='' width={'100%'}/>
                            </Link>
                            
                        </div>
                    </div>
                    <div className='icon-title'><h5>Mobile Phone</h5></div>
                </div>
                <div className="col-md-3">
                    <div className="round-card">
                        <div className='card-content' onClick={()=>getGroceryData('Laptop')}>
                            <Link  className="" data-bs-dismiss="offcanvas">
                                <img src={Laptop} className='' width={'100%'}/>
                            </Link>
                            
                        </div>
                    </div>
                    <div className='icon-title'><h5>Laptop</h5></div>
                </div>
                
                <div className="col-md-3">
                    <div className="round-card">
                        <div className='card-content' onClick={()=>getGroceryData('Desktop')}>
                            <Link  className="" data-bs-dismiss="offcanvas">
                                <img src={Desktop} className='' width={'100%'}/>
                            </Link>
                            
                        </div>
                    </div>
                    <div className='icon-title'><h5>Desktop</h5></div>
                </div>
                
                
            </div> 
      </div>
        </>
    )
}

export default ElectronicSubCategory;
