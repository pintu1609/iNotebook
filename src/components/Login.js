import React,{useState} from 'react'
import { useNavigate} from "react-router-dom"

const Login = (props) => {

  const [credentials,setCredentials] = useState({email:"", password:""})
  let navigate= useNavigate();


  const handleSumbit = async(e)=>{
    e.preventDefault();
    
    
    try{

      const submitButton = e.target.querySelector('button[type="submit"]');
      submitButton.textContent = 'Logging in...';

      const response = await fetch("http://localhost/api/auth/login", {
      method: "POST", 
       
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({email: credentials.email, password: credentials.password})
    });
    const json= await response.json();
    console.log(json)
    if(json.success){
      //save the auth token and redirect

      localStorage.setItem('token', json.authtoken)
      props.showAlert("Login Successfully","success" )
      navigate("/");

    }else{
      props.showAlert("invalid Crediential","danger" )    
    }
  } catch (error) {
    console.error("Fetch API error:", error);
    // Handle the error appropriately, e.g., display an error message to the user
    props.showAlert("Error occurred during Login due to server. Please try again later.", "danger");
  }
  finally{
    const submitButton = e.target.querySelector('button[type="submit"]');
      submitButton.textContent = 'Login';
  }
  }


  const onChange=(e)=>{
    setCredentials({...credentials, [e.target.name]:e.target.value})
}


  return (
    <div className='mt-3'>
      <h2>Login to continue to iNotebook</h2>
     <form onSubmit={handleSumbit}>
          <div className="my-3">
            <label htmlFor="email" className="form-label">Email address</label>
            <input type="email" className="form-control" id="email" name="email" value={credentials.email} onChange={onChange} aria-describedby="emailHelp"/>
            <div id="emailHelp" className="form-text">We'll never share your email with anyone else.</div>
          </div>
          <div className="mb-3">
            <label htmlFor="password" className="form-label">Password</label>
            <input type="password" className="form-control" id="password" value={credentials.password} onChange={onChange}  name="password"/>
          </div>
          
          <button type="submit" className="btn btn-primary" >Login</button>
        </form>
    </div>
  )
}

export default Login
