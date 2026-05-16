import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';

const Signup = (props) => {
    const[credentials, setCredentials] = useState({
        name : "Enter your name",
        email : "Enter an email",
        password : "",
        cpassword : ""
    });
    const navigate = useNavigate();
    const handleSubmit = async (e) => {
        e.preventDefault();
        const response = await fetch("http://localhost:5000/api/auth/createuser", {
            method: 'POST',
            headers: {
                "Content-Type": 'application/json'
            },
            body: JSON.stringify({name : credentials.name, email: credentials.email, password : credentials.password }),
        });
        const json = await response.json();
        console.log(json);
        if(json.success){
            localStorage.setItem('token', json.authtoken);
            navigate("/");
            props.showAlert("Completed account creation", "success")
        } else{
            props.showAlert("Invalid credentials", "danger")
        }
    }
    
    const onChange = (e) => {
        setCredentials({ ...credentials, [e.target.id]: e.target.value })
    }
    return (
        <div className = "container">
            <h2>Create an account to continue to iNotebook</h2>
            <form onSubmit={handleSubmit}>
                <div className="mb-3">
                    <label htmlFor="name" className="form-label">Name</label>
                    <input type="text" className="form-control" id="name" aria-describedby="emailHelp" value = {credentials.name} onChange={onChange}/>
                </div>
                <div className="mb-3">
                    <label htmlFor="email" className="form-label">Email address</label>
                    <input type="email" className="form-control" id="email" aria-describedby="emailHelp" value = {credentials.email} onChange={onChange}/>
                </div>
                <div className="mb-3">
                    <label htmlFor="password" className="form-label">Password</label>
                    <input type="password" className="form-control" id="password" value = {credentials.password} onChange={onChange}/>
                </div>
                <div className="mb-3">
                    <label htmlFor="cpassword" className="form-label">Confirm password</label>
                    <input type="password" className="form-control" id="cpassword" value = {credentials.cpassword} onChange={onChange}/>
                </div>
                <button disabled = {credentials.password !== credentials.cpassword}type="submit" className="btn btn-primary">Submit</button>
            </form>
        </div>
    )
}

export default Signup