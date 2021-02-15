import React, { useState } from 'react'
import { Link, Redirect } from 'react-router-dom';
import { authenticate, isAuthenticated, signin, signout } from '../auth/helper';
import Base from '../core/Base'



function Signin() {


    const [values,setValues] = useState({
        email:"",
        password:"",
        error:"",
        success:false,
        loading : false,
        didRedirect:false,
    })

    const [token,setToken] = useState('')

    const {email,password,error,success,loading,didRedirect} = values;

    const handleChange = (value) => (event) => {
        setValues({...values,error:false,[value]: event.target.value})
    }

    const errorMessage =() => {
        return(
            <div className="row">
                <div className="col-md-6 offset-sm-3 text-left">
                    <div 
                    className="alert alert-danger"
                    style = {{display:error ? "":"none"}}
                    >
                    Invalid Email
                    </div>
                </div>
            </div>
        )
    }

    const performRedirect = () => {
        if(isAuthenticated()){
            return <Redirect to="/" />
        }
    }

    const loadingMessage = () => {
        return(
            loading && (
                <div className="alert alert-info">
                    <h2>Signing in...</h2>
                </div>
            )
        )
    }

    const handleSubmit = (event) => {
        event.preventDefault();
        setValues({...values,error:false,loading:true})

        signin({email,password})
        .then(data => {
            console.log("DATA",data)
            if(data.token){
                let sessionToken = data.token;
                setToken(sessionToken)
                authenticate(data,()=>{
                    console.log("TOKEN ADDED");
                    setValues({
                        ...values,
                        didRedirect:true
                    })

                })
            }else {
                setValues({
                    ...values,
                    loading:false,
                    error:true,
                })
            }
        })
        .catch(e => console.log(e))
    }
    const signInForm = () =>{
        return(
            <div className="row">
                <div className="col-md-6 offset-sm-3 text-left">
                    <form>
                        {/* {errorMessage(displayNameError)} */}
                        <div className="form-group">
                            <label className="text-light">Email</label>
                            <input 
                            type="email" 
                            className="form-control"
                            value={email}
                            onChange={handleChange('email')}/>
                        </div>
                        {/* {errorMessage(displayEmailError)} */}
                        <div className="form-group">
                            <label className="text-light">Password</label>
                            <input 
                            type="password" 
                            className="form-control"
                            value={password}
                            onChange={handleChange('password')}/>
                        </div>
                        {/* {errorMessage(displayPasswordError)} */}
                        <button onClick={handleSubmit} className="btn btn-success btn-block">SignIn</button>
                    </form>
                </div>
            </div>

        );
    }


    return (
        <Base title="Signin Page" description="Login to purchase">
            {errorMessage()}
            {loadingMessage()}

            {signInForm()}
          <p className="text-center">{JSON.stringify(values)}</p>
            {performRedirect()}
            
        </Base>
    )
}

export default Signin
