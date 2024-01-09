import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';

const Signup = (props) => {
  const [credential, setcredential] = useState({ name: "", email: "", password: "", confirmPassword: "" })
  const navigate = useNavigate();

  const onchange = (e) => {
    setcredential({ ...credential, [e.target.name]: e.target.value })
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    let { name, email, password } = credential
    const response = await fetch('http://127.0.0.1:5000/api/auth/createuser', {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ name: credential.name, email: credential.email, password: credential.password }),
    });
    const json = await response.json();
    console.log(json)
    if (json.success) {
      //save the auth token and redirect
      localStorage.setItem('authToken', json.authToken);
      navigate('/');
      props.showAlert("Sucessfully account created ", "success");
    }
    else {
      props.showAlert("ID already exists", "danger");
    }
  }


  return (
    <div className='container'>
      <h1>Signup to iNoteBook</h1>
      <br />
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label htmlFor="exampleInputEmail1" className="form-label">Name:</label>
          <input type="text" className="form-control" id="name" onChange={onchange} aria-describedby="emailHelp" name='name' required />
        </div>
        <div className="mb-3">
          <label htmlFor="email" className="form-label">Email address</label>
          <input type="email" className="form-control" id="email" onChange={onchange} aria-describedby="emailHelp" name='email' required />
          <div id="emailHelp" className="form-text">We'll never share your email with anyone else.</div>
        </div>
        <div className="mb-3">
          <label htmlFor="password" className="form-label">Password</label>
          <input type="password" className="form-control" id="password" onChange={onchange} name='password' required />
          <div className="col-auto">
            <span id="passwordHelpInline" className="form-text">
              Must be greater than 5 characters.
            </span>
          </div>
        </div>
        <div className="mb-3">
          <label htmlFor="confirmPassword" className="form-label">Confirm Password</label>
          <input type="password" className="form-control" id="confirmPassword" onChange={onchange} name='confirmPassword' required />
        </div>

        <button disabled={credential.name.length < 4 || credential.password !== credential.confirmPassword} type="submit" className="btn btn-primary">Submit</button>
      </form>
    </div>
  )
}

export default Signup
