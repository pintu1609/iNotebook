import React, {useState, useEffect} from 'react'
import { useNavigate } from 'react-router-dom';
// import '../css/profile.css';

const Profile = ({ closeModal, showAlert }) => {
  

    let Navigate =useNavigate();

    const handleLogout = ()=>{
       localStorage.removeItem('token');
       closeModal();

       Navigate('/login');
      showAlert("Logout Successfully","success") 
    }
    const [profile, setProfile] = useState({ name: '', email: '', _id: '' });

    // Fetch user profile on component mount
    useEffect(() => {
      getProfile();
    }, []);

    //get a note
    const getProfile=async()=>{

      // api Call
      try{

      const response = await fetch("https://inotebook-1-hafl.onrender.com/api/auth/getuser", {
       method: "POST", 
        
       headers: {
         "auth-token": localStorage.getItem('token')
       },
      
     });
     const json=await response.json();
     console.log(json)
     setProfile(json)

    } catch (error) {
        console.error('Error fetching profile:', error);
      }

     

   }

  return (
    <div >
      
      <div className="modal d-flex"  tabIndex="-1" style={{display:"block", position:"absolute", top:"50%", left:"65%", transform:"translate{-65%, -50%}",width:"25rem",height:"25rem" }}>
        <div className="modal-dialog"  >
            <div className="modal-content" style={{background:"#fff",opacity:0.95 }}>
              <div className="modal-header">
                  <h5 className="modal-title">Profile</h5>
                  {/* <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close" onClick={closeModal} ></button> */}
              </div>

              <div className="modal-body">
                
                    <div className="card" style={{width: "20rem"}}>
                      
                      <div className="card-body" style={{background:"#ffffff",border:"1px,black", color:"black",borderRadius:"5px"}}>
              
                          <p className="card-text">Name: {profile.name}</p>
                          <p className="card-text">Email: {profile.email}</p>
                          <p className="card-text">User_Id: {profile._id}</p>
                          
                      </div>
                    </div>
               
              </div>
                <div class="modal-footer">
                    <button type='button'  className="btn btn-secondary" onClick={closeModal}>Close</button>
                    <button onClick={handleLogout} class="btn btn-primary">Logout</button>
                </div>
            </div>
        </div>
      </div>
        <div className="modal-backdrop show"></div>
   </div>
   
  )
}

export default Profile
