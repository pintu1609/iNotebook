import React,{useState} from 'react'
import { useNavigate } from 'react-router-dom';

const Signup = (props) => {

  const [credentials,setCredentials] = useState({name:"", email:"", password:"", cpassword:""})

  let navigate= useNavigate();


  const handleSumbit = async(e)=>{
    e.preventDefault();
    

    const {name, email, password}=credentials;

    try{

     
    const response = await fetch("https://inotebook-1-hafl.onrender.com/api/auth/createuser", {
      method: "POST", 
       
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({name, email, password})
    }); 
    
    const json= await response.json();
    console.log(json)
    if(json.success){
    //   //save the auth token and redirect

      localStorage.setItem('token', json.authtoken)
        navigate("/");
  
      props.showAlert("Account Created Successfully","success" )

     }else{
      props.showAlert("invalid Crediential","danger" )
    }

  } catch (error) {
    console.error("Fetch API error:", error);
    // Handle the error appropriately, e.g., display an error message to the user
    props.showAlert("Error occurred during Signup due to server. Please try again later.", "danger");
  }
  

  }

  const onChange=(e)=>{
    setCredentials({...credentials, [e.target.name]:e.target.value})
}
  return (
    <div className='container mt-2'>
      <h2 className='my-2'>Create an Account to continue to use iNotebook</h2>
      <form onSubmit={handleSumbit}>

      <div className="mb-3">
          <label htmlFor="name" className="form-label">Name</label>
          <input type="text" className="form-control" id="name"  name="name" aria-describedby="emailHelp" onChange={onChange} value={credentials.name} minLength={3} required/>
        </div>
        <div className="mb-3">
          <label htmlFor="email" className="form-label">Email address</label>
          <input type="email" className="form-control" id="email" name='email' aria-describedby="emailHelp" onChange={onChange} value={credentials.email} required/>
          <div id="emailHelp" className="form-text">We'll never share your email with anyone else.</div>
        </div>
        <div className="mb-3">
          <label htmlFor="password" className="form-label">Password</label>
          <input type="password" className="form-control" id="password" name='password' onChange={onChange} value={credentials.password} minLength={8} required/>
        </div>
        <div className="mb-3">
          <label htmlFor="cpassword" className="form-label">Confirm Password</label>
          <input type="password" className="form-control" id="cpassword" name='cpassword' onChange={onChange} value={credentials.cpassword}minLength={8} required/>
        </div>
        
        <button type="submit" disabled={credentials.password !== credentials.cpassword} className="btn btn-primary">Signup</button>
      </form>
    </div>
  )
}

export default Signup
