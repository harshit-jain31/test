import { Link } from "react-router-dom";

function Menu() {
    return(
        <div>
            <div className="offcanvas offcanvas-start w-20 menu-container" tabIndex="-1" id="offcanvas" data-bs-keyboard="false" data-bs-backdrop="false">
            <div className="offcanvas-header">
            <h3 className="offcanvas-title d-none d-sm-block" id="offcanvas">DT Store</h3>
            <button type="button" className="btn-close text-reset" data-bs-dismiss="offcanvas" aria-label="Close"></button>
            </div>
            <div className="offcanvas-body px-0">
            <ul className="nav nav-pills flex-column mb-sm-auto mb-0 align-items-start" id="menu">
                {/* <li className="nav-item userList">
                    <span className="userProfile">SS</span>
                    <span>Signed in as</span>
                    <span className="logout-icon"><i className="bi bi-box-arrow-right"></i></span>
                    
                </li> */}
                <li className="nav-item navList">
                    <Link to="/grocerySubCategory" className="nav-link text-truncate" data-bs-dismiss="offcanvas">
                        Grocery
                    </Link>
                </li>
                <li className="nav-item navList">
                    <Link to="/electronicSubCategory" className="nav-link text-truncate" data-bs-dismiss="offcanvas">
                        Electronics
                    </Link>
                    </li>
                <li className="nav-item navList">
                    <Link to="/faishonSubCategory" className="nav-link text-truncate" data-bs-dismiss="offcanvas">
                        Fashion
                    </Link>
                </li>
            </ul>
            </div>
        </div>
       
        </div>
    )
}

export default Menu;
