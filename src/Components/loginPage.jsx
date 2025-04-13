import React from "react";
import "./login.css";
import googlImg from "./Assets/Google.webp";
import lockImg from "./Assets/lock.png";
import personImg from "./Assets/person.png"


function LoginPage() {

    return(
        
        <div className="container">
            
            <div className="header">

                <div className="text">Login</div>
                <div className="underline"></div>
            </div>

            <div className="inputs">

           
                <div className="input">
                <img src={personImg} alt="logo" />
                    <input type="email" placeholder="Example@gmail.com" />
                </div>

          

                <div className="input">
                    <img src={lockImg} alt="logo" />
                    <input type="password" placeholder="Password" />
                </div>

                

            </div>

            <div className="login-btn"><h3>Login</h3></div>

            <div className="forgot-password">Forgot Password? <span>Click Here!</span></div>

            <hr />

            <div className="submit-container">

                <div className="submit">
                <img src={googlImg} alt="logo" />
                    Continue with Google

                </div>

                <h3>OR</h3>

                <div className="submit">Sign Up</div>

                
            </div>
            
              
        </div>
    )
}

export default LoginPage;