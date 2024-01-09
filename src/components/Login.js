import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';


const Login = (props) => {
  const [credential, setcredential] = useState({ email: "", password: "" })
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const response = await fetch('http://127.0.0.1:5000/api/auth/login', {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ email: credential.email, password: credential.password }),
    });
    const json = await response.json();
    console.log(json)
    if (json.success) {
      //save the auth token and redirect
      localStorage.setItem('authToken', json.authToken);
      props.showAlert("Logedin Successful ", "success");
      navigate('/');
    }
    else {
      props.showAlert("Invalid Credentials", "danger");
    }

  }

  const onchange = (e) => {
    setcredential({ ...credential, [e.target.name]: e.target.value })
  }

  return (
    <div className='container'>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <h1>Login to use iNoteBook</h1>
          <label htmlFor="email" className="form-label my-2">Email address</label>
          <input type="email" className="form-control" id="email" name='email' value={credential.email} aria-describedby="emailHelp" onChange={onchange} required />
          <div id="emailHelp" className="form-text">We'll never share your email with anyone else.</div>
        </div>
        <div className="mb-3">
          <label htmlFor="password" className="form-label">Password</label>
          <input type="password" className="form-control" id="password" name='password' value={credential.password} onChange={onchange} required />
        </div>
        <button type="submit" className="btn btn-primary">Submit</button>
      </form>
    </div>
  )
}

export default Login
