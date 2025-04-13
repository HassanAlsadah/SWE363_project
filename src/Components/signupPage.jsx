import React from "react";
import "./signup.css";
import phoneImg from "./Assets/phone.png";
import lockImg from "./Assets/lock.png";
import personImg from "./Assets/person.png"
import mailImg from "./Assets/mail.png"

function SignUpPage(){

    return (

        <div className="container2">
                    
                    <div className="header">
        
                        <div className="text">Sign Up</div>
                        <div className="underline"></div>
                    </div>
        
                    <div className="inputs2">
        
                   
                        <div className="name-input">

                            <div className="normal-input">
                            <img src={personImg} alt="Fname" />
                                <input type="text" placeholder="First Name" />
                            </div>
                            
                            <div className="normal-input">
                                <img src={personImg} alt="Lname" />
                                <input type="text" placeholder="Lst Name" />
                            </div>

                        </div>

                        <div className="normal-input">
                            <img src={phoneImg} alt="phone" />
                            <input type="text" placeholder="Phone Numer" />
                        </div>

                        <div className="normal-input">
                            <img src={mailImg} alt="email" />
                            <input type="email" placeholder="Example@gmail.com" />
                        </div>

                        <div className="normal-input">
                            <img src={lockImg} alt="password" />
                            <input type="password" placeholder="Password" />
                        </div>

                        <div className="normal-input">
                            <img src={lockImg} alt="confirm_password" />
                            <input type="password" placeholder="Confirm-Password" />
                        </div>

        
                        
        
                    </div>
        
                    <div className="Signup-btn"><h3>Sign Up</h3></div>
        
                    <div className="forgot-password">Already has Account? <span>Login!</span></div>
        
                   
        
                    
                        
                    
                    
                      
                </div>
    )
}


export default SignUpPage ;