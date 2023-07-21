import React, {useState, useEffect} from 'react'
import { useNavigate } from 'react-router-dom';

const Profile = ({ closeModal }) => {
  

    let Navigate =useNavigate();

    const handleLogout = ()=>{
       localStorage.removeItem('token');
       closeModal();

       Navigate('/login'); 
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

      const response = await fetch("http://localhost/api/auth/getuser", {
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
    <div>
      
      <div className="modal d-flex" tabIndex="-1" style={{display:"block", position:"absolute", top:"50%", left:"65%", transform:"translate{-50%, -50%}",width:"25rem",height:"25rem" }}>
        <div className="modal-dialog" >
            <div className="modal-content">
            <div className="modal-header">
                <h5 className="modal-title">Profile</h5>
                <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close" onClick={closeModal} ></button>
            </div>
            <div className="modal-body">
                
            <div className="card" style={{width: "20rem"}}>
                
                <div className="card-body">
        
                    <p className="card-text">Name: {profile.name}</p>
                    <p className="card-text">Email: {profile.email}</p>
                    <p className="card-text">User_Id: {profile._id}</p>
                    
                </div>
                </div>

            <button onClick={handleLogout} className='btn btn-primary mx-2 my-2' > Logout</button>
            </div>
            </div>
        </div>
        </div>
        <div className="modal-backdrop show"></div>
    </div>
   
  )
}

export default Profile
