import React,{useState} from 'react'
import  {Link,  useLocation} from "react-router-dom"
import Profile from './Profile';


const Navbar = () => {

    const [showProfileModal, setShowProfileModal] = useState(false);
  
    let location=useLocation();

    const handleProfileIconClick = () => {
        setShowProfileModal(true);
      };
      console.log(showProfileModal);
      

  return (
  
      <nav className="navbar navbar-expand-lg bg-body-tertiary fixed-top" style={{height:"50px"}} >
            <div className="container-fluid">
                <Link className="navbar-brand" to="/">iNotebook</Link>
                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarSupportedContent">
                <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                    <li className="nav-item" >
                    <Link className={`nav-link ${location.pathname==="/"?"active":""}`} aria-current="page" to="/">Home</Link>
                    </li>
                    <li className="nav-item" >
                    <Link className={`nav-link ${location.pathname==="/about"?"active":""}`} to="/about">About</Link>
                    </li>
                </ul>
                {!localStorage.getItem('token')? <form className="d-flex" >
                  
                    <Link className="btn btn-primary mx-2" to="/login" role="button" >Login</Link>
                    <Link className="btn btn-primary mx-2" to="/signup" role="button">Signup</Link>

                </form>: 
                <div style={{marginTop:"25px" }}>
                <i className="fa-solid fa-user fa-2xl mx-3" style={{ height: '40px', cursor: 'pointer' }}
                    onClick={handleProfileIconClick}></i> 
        
                </div>
                }
                </div>
            </div>
            {showProfileModal && <Profile closeModal={() => setShowProfileModal(false)} />}
      </nav>
    
  )
}

export default Navbar
