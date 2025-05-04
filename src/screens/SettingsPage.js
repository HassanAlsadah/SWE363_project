import React, { useState, useEffect } from "react";
import axios from "axios";
import { api } from "../utils/api";
import "../styles/SettingsPage.css";

function SettingsPage() {
  const [userData, setUserData] = useState({
    name: "",
    email: "",
    phone: "",
    teamsAccount: "",
    degree: "",
    certificates: ""
  });

  const [editingPersonal, setEditingPersonal] = useState(false);
  const [editingQualifications, setEditingQualifications] = useState(false);
  const [loading, setLoading] = useState({
    fetching: true,
    saving: false
  });
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);

  // Fetch user data on component mount
  useEffect(() => {
    const fetchUserData = async () => {
      try {
        setLoading(prev => ({ ...prev, fetching: true }));
        setError(null);
        
        const token = localStorage.getItem('token');
        if (!token) {
          throw new Error('Authentication token not found');
        }

        const response = await axios.get(api.users.getMe, {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });

        const { name, email, phone, teamsAccount, degree, certificates } = response.data.data;
        
        setUserData({
          name,
          email,
          phone: phone || "",
          teamsAccount: teamsAccount || "",
          degree: degree || "",
          certificates: certificates || ""
        });
      } catch (err) {
        console.error('Failed to fetch user data:', err);
        setError(err.response?.data?.message || err.message || 'Failed to load user data');
      } finally {
        setLoading(prev => ({ ...prev, fetching: false }));
      }
    };

    fetchUserData();
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUserData(prev => ({ ...prev, [name]: value }));
  };

  const saveChanges = async (section) => {
    try {
      setLoading(prev => ({ ...prev, saving: true }));
      setError(null);
      setSuccess(null);
      
      const token = localStorage.getItem('token');
      if (!token) {
        throw new Error('Authentication token not found');
      }

      // Prepare data to update based on which section is being saved
      let updateData = {};
      if (section === 'personal') {
        updateData = {
          name: userData.name,
          email: userData.email,
          phone: userData.phone,
          teamsAccount: userData.teamsAccount
        };
        setEditingPersonal(false);
      } else {
        updateData = {
          degree: userData.degree,
          certificates: userData.certificates
        };
        setEditingQualifications(false);
      }

      const response = await axios.put(
        api.users.updateDetails,
        updateData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json'
          }
        }
      );

      setSuccess('Your changes have been saved successfully!');
      setTimeout(() => setSuccess(null), 5000);
    } catch (err) {
      console.error('Failed to save changes:', err);
      setError(err.response?.data?.message || err.message || 'Failed to save changes');
      
      // Re-fetch original data if update fails
      if (err.response?.status === 401) {
        localStorage.removeItem('token');
        window.location.reload();
      }
    } finally {
      setLoading(prev => ({ ...prev, saving: false }));
    }
  };

  if (loading.fetching) {
    return (
      <div className="settings-loading-container">
        <div className="settings-spinner"></div>
        <p>Loading your profile...</p>
      </div>
    );
  }

  return (
    <div className="settings-page-container">
      <div className="header">
        <div className="text">Settings</div>
        <div className="underline"></div>
      </div>

      {error && (
        <div className="settings-alert settings-error">
          <span>{error}</span>
          <button 
            onClick={() => setError(null)}
            className="settings-alert-close"
            aria-label="Close error"
          >
            &times;
          </button>
        </div>
      )}

      {success && (
        <div className="settings-alert settings-success">
          <span>{success}</span>
          <button 
            onClick={() => setSuccess(null)}
            className="settings-alert-close"
            aria-label="Close success message"
          >
            &times;
          </button>
        </div>
      )}

      <div className="settings-card">
        <div className="settings-header">
          <div className="settings-title">Personal Information</div>
          {editingPersonal ? (
            <button 
              className="settings-save-btn"
              onClick={() => saveChanges('personal')}
              disabled={loading.saving}
            >
              {loading.saving ? 'Saving...' : 'Save Changes'}
            </button>
          ) : (
            <button 
              className="settings-edit-btn"
              onClick={() => setEditingPersonal(true)}
              disabled={editingQualifications}
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
                value={userData.name}
                onChange={handleInputChange}
                className="settings-input"
                required
              />
            ) : (
              <div className="settings-info-value">{userData.name}</div>
            )}
          </div>

          <div className="settings-info-item">
            <div className="settings-info-label">Email:</div>
            {editingPersonal ? (
              <input
                type="email"
                name="email"
                value={userData.email}
                onChange={handleInputChange}
                className="settings-input"
                required
              />
            ) : (
              <div className="settings-info-value">{userData.email}</div>
            )}
          </div>

          <div className="settings-info-item">
            <div className="settings-info-label">Phone:</div>
            {editingPersonal ? (
              <input
                type="tel"
                name="phone"
                value={userData.phone}
                onChange={handleInputChange}
                className="settings-input"
                pattern="[0-9]{10,15}"
                title="10-15 digit phone number"
              />
            ) : (
              <div className="settings-info-value">
                {userData.phone || "Not provided"}
              </div>
            )}
          </div>

          <div className="settings-info-item">
            <div className="settings-info-label">Teams Account:</div>
            {editingPersonal ? (
              <input
                type="text"
                name="teamsAccount"
                value={userData.teamsAccount}
                onChange={handleInputChange}
                className="settings-input"
              />
            ) : (
              <div className="settings-info-value">
                {userData.teamsAccount || "Not provided"}
              </div>
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
              disabled={loading.saving}
            >
              {loading.saving ? 'Saving...' : 'Save Changes'}
            </button>
          ) : (
            <button 
              className="settings-edit-btn"
              onClick={() => setEditingQualifications(true)}
              disabled={editingPersonal}
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
                value={userData.degree}
                onChange={handleInputChange}
                className="settings-input"
              />
            ) : (
              <div className="settings-info-value">
                {userData.degree || "Not provided"}
              </div>
            )}
          </div>

          <div className="settings-info-item">
            <div className="settings-info-label">Certificates:</div>
            {editingQualifications ? (
              <textarea
                name="certificates"
                value={userData.certificates}
                onChange={handleInputChange}
                className="settings-input settings-textarea"
                rows="3"
              />
            ) : (
              <div className="settings-info-value">
                {userData.certificates || "Not provided"}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default SettingsPage;