import React from "react";
import "./settingsPage.css"

function SettingPage(){

    

    return(
        
        <div className="container">

            <div className="header">
                <div className="text">Settings</div>
                <div className="underline"></div>
            </div>

            <div className="container-info">
        
                <div className="title">Personal Information</div>
        
                <div className="one-info">
                    <div className="info-title">-Name:</div>
                    <div className="info-answer">Mohammed Al Lail</div>
                </div>


                <div className="one-info">
                    <div className="info-title">-Email:</div>
                    <div className="info-answer">allail.mohammed3404@gmail.com</div>
                </div>

                <div className="one-info">
                    <div className="info-title">-phone:</div>
                    <div className="info-answer">0546840521</div>
                </div>

                <div className="one-info">
                    <div className="info-title">-Teams Account:</div>
                    <div className="info-answer">s202152850@kfupm.edu.sa</div>
                </div>

                <div className="edit-btn">Edit</div>
        
        
            </div>   {/* End of personal info section */}


            <div className="container-info">

                <div className="title">Certificates and Qualifications</div>

                <div className="one-info">
                    <div className="info-title">-Degree:</div>
                    <div className="info-answer">Bachelor in Software Engineering</div>
                </div>

                <div className="one-info">
                    <div className="info-title">-Certificates:</div>
                    <div className="info-answer">PMP | CompTIA Security+ | CCNA</div>
                 
                </div>

                <div className="edit-btn">Edit</div>

            </div>
            

            

        </div>
    )
}

export default SettingPage ;