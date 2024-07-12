function ElectronicSubCategory({setSearchedData}) {
    const [ackData,setAckData] = useState();
    const [catName,setCatName] = useState('');
    const [finalData,setFinalData] = useState([]);
    const [loader,setLoader] = useState(false);
    const navigate = useNavigate();
    var categoryItem = '';

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
