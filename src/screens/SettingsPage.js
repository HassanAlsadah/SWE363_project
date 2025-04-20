import React, { useState } from "react";
import "../styles/SettingsPage.css";

function SettingPage() {
  const [personalInfo, setPersonalInfo] = useState({
    name: "Mohammed Al Lail",
    email: "allail.mohammed3404@gmail.com",
    phone: "0546840521",
    teamsAccount: "s202152850@kfupm.edu.sa"
  });

  const [qualifications, setQualifications] = useState({
    degree: "Bachelor in Software Engineering",
    certificates: "PMP | CompTIA Security+ | CCNA"
  });

  const [editingPersonal, setEditingPersonal] = useState(false);
  const [editingQualifications, setEditingQualifications] = useState(false);

  const handlePersonalChange = (e) => {
    const { name, value } = e.target;
    setPersonalInfo(prev => ({ ...prev, [name]: value }));
  };

  const handleQualificationsChange = (e) => {
    const { name, value } = e.target;
    setQualifications(prev => ({ ...prev, [name]: value }));
  };

  const saveChanges = (section) => {
    if (section === 'personal') {
      setEditingPersonal(false);
      // Here you would typically send data to backend
    } else {
      setEditingQualifications(false);
      // Here you would typically send data to backend
    }
  };

  return (
    <div className="settings-page-container">
      <div className="header">
        <div className="text">Settings</div>
        <div className="underline"></div>
      </div>

      <div className="settings-card">
        <div className="settings-header">
          <div className="settings-title">Personal Information</div>
          {editingPersonal ? (
            <button 
              className="settings-save-btn"
              onClick={() => saveChanges('personal')}
            >
              Save
            </button>
          ) : (
            <button 
              className="settings-edit-btn"
              onClick={() => setEditingPersonal(true)}
            >
              Edit
            </button>
          )}
        </div>

        <div className="settings-info-group">
          <div className="settings-info-item">
            <div className="settings-info-label">Name:</div>
            {editingPersonal ? (
              <input
                type="text"
                name="name"
                value={personalInfo.name}
                onChange={handlePersonalChange}
                className="settings-input"
              />
            ) : (
              <div className="settings-info-value">{personalInfo.name}</div>
            )}
          </div>

          <div className="settings-info-item">
            <div className="settings-info-label">Email:</div>
            {editingPersonal ? (
              <input
                type="email"
                name="email"
                value={personalInfo.email}
                onChange={handlePersonalChange}
                className="settings-input"
              />
            ) : (
              <div className="settings-info-value">{personalInfo.email}</div>
            )}
          </div>

          <div className="settings-info-item">
            <div className="settings-info-label">Phone:</div>
            {editingPersonal ? (
              <input
                type="tel"
                name="phone"
                value={personalInfo.phone}
                onChange={handlePersonalChange}
                className="settings-input"
              />
            ) : (
              <div className="settings-info-value">{personalInfo.phone}</div>
            )}
          </div>

          <div className="settings-info-item">
            <div className="settings-info-label">Teams Account:</div>
            {editingPersonal ? (
              <input
                type="text"
                name="teamsAccount"
                value={personalInfo.teamsAccount}
                onChange={handlePersonalChange}
                className="settings-input"
              />
            ) : (
              <div className="settings-info-value">{personalInfo.teamsAccount}</div>
            )}
          </div>
        </div>
      </div>

      <div className="settings-card">
        <div className="settings-header">
          <div className="settings-title">Certificates and Qualifications</div>
          {editingQualifications ? (
            <button 
              className="settings-save-btn"
              onClick={() => saveChanges('qualifications')}
            >
              Save
            </button>
          ) : (
            <button 
              className="settings-edit-btn"
              onClick={() => setEditingQualifications(true)}
            >
              Edit
            </button>
          )}
        </div>

        <div className="settings-info-group">
          <div className="settings-info-item">
            <div className="settings-info-label">Degree:</div>
            {editingQualifications ? (
              <input
                type="text"
                name="degree"
                value={qualifications.degree}
                onChange={handleQualificationsChange}
                className="settings-input"
              />
            ) : (
              <div className="settings-info-value">{qualifications.degree}</div>
            )}
          </div>

          <div className="settings-info-item">
            <div className="settings-info-label">Certificates:</div>
            {editingQualifications ? (
              <input
                type="text"
                name="certificates"
                value={qualifications.certificates}
                onChange={handleQualificationsChange}
                className="settings-input"
              />
            ) : (
              <div className="settings-info-value">{qualifications.certificates}</div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default SettingPage;