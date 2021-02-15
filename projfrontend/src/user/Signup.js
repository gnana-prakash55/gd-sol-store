import React,{useState} from 'react'
import Base from '../core/Base'
import {Link} from 'react-router-dom'
import {signup} from '../auth/helper'

function Signup() {

    const [values,setValues] = useState({
        name:"",
        email:"",
        password:"",
        error :"",
        success : false
    });
    const [err,setErr] = useState([])

    const {name,email,password,error,success} = values;

    const handleChange = (value) => (event) => {
        setValues({...values,error:false,[value]: event.target.value})
    }

    const successMessage =() => {
        return(
            <div className="row">
                <div className="col-md-6 offset-sm-3 text-left">
                    <div 
                    className="alert alert-success"
                    style = {{display:success ? "":"none"}}
                    >
                    Account Created Successfully🙂 
                    </div>
                </div>
            </div>
        )
    }

    const displayEmailError = (err) => {
        if (err.email) return err.email
    }
    const displayPasswordError = (err) => {
        if (err.password) return err.password
    }
    const displayNameError = (err) => {
        if (err.name) return err.name
    }

    const errorMessage =(displayError) => {
        return(
            <div className="row">
                <div className="col-md-6 offset text-left">
                    <div 
                    className="alert alert-danger"
                    style = {{display:error && displayError(err) ? "":"none"}}
                    >
                    {displayError(err)}
                    </div>
                </div>
            </div>
        )
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        setValues({...values,error:false});
        signup({name,email,password})
        .then(data => {
            console.log("DATA",data);
            if(data.name === name){
                setValues({...values,
                name:"",
                email:"",
                password:"",
                error:"",    
                success:true,   
            })
            } else {
                setValues({
                    ...values,
                    error:true,
                    success:false,
                })
                setErr(data)
            }
        })
        .catch(err => console.log(err))
    }

    const signUpForm = () =>{
        return(
            <div className="row">
                <div className="col-md-6 offset-sm-3 text-left">
                    <form>
                        <div className="form-group">
                            <label className="text-light">Name</label>
                            <input 
                            type="text" 
                            className="form-control"
                            value={name}
                            onChange={handleChange('name')}/>
                        </div>
                        {errorMessage(displayNameError)}
                        <div className="form-group">
                            <label className="text-light">Email</label>
                            <input 
                            type="email" 
                            className="form-control"
                            value={email}
                            onChange={handleChange('email')}/>
                        </div>
                        {errorMessage(displayEmailError)}
                        <div className="form-group">
                            <label className="text-light">Password</label>
                            <input 
                            type="password" 
                            className="form-control"
                            value={password}
                            onChange={handleChange('password')}/>
                        </div>
                        {errorMessage(displayPasswordError)}
                        <button onClick={handleSubmit} className="btn btn-success btn-block">Submit</button>
                    </form>
                </div>
            </div>

        );
    }

    return (
        <Base title="Sign Up Page" description="Register for GD User">
            {successMessage()}
            {signUpForm()}
            <p className="text-light text-center">
                {JSON.stringify(values)}
            </p>
        </Base>
    )
}

export default Signup;
