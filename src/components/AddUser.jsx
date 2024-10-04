import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const AddUser = ({ usersData, setUsersData }) => {
  const [applicationName, setApplicationName] = useState('');
  const [gender, setGender] = useState('');
  const [govtIDType, setGovtIDType] = useState('');
  const [date, setDate] = useState('');
  const [newstate, setNewState] = useState('');
  const [loadApplied, setLoadApplied] = useState('');
  const [status, setStatus] = useState('');
  const [error, setError] = useState(''); // To store validation error message
  const navigate = useNavigate();

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();

    // Generate a new ID (based on the length of the array or find the highest ID and increment)
    const newID = usersData.length ? Math.max(...usersData.map((item) => item.ID)) + 1 : 1;

    // Create new user object
    const newUser = {
      ID: newID,
      Applicant_Name: applicationName,
      Gender: gender,
      GovtID_Type: govtIDType,
      Date_of_Application: date,
      State: newstate,
      Load_Applied: loadApplied,
      Status: status,
    };

    // Update the usersData state with the new user
    setUsersData([...usersData, newUser]);

    // Navigate back to the main table
    navigate('/');
  };

  // Handle Load Applied input change
  const handleLoadChange = (e) => {
    const value = e.target.value;
    if (value === '' || parseInt(value) < 200) {
      setLoadApplied(value);
      setError(''); // Clear the error if the value is valid
    } else {
      setError('Load Applied must be less than 200');
    }
  };

  return (
    <div className="container mt-5">
      <h1 className="text-center mb-4">Add New User</h1>
      <form onSubmit={handleSubmit} className="shadow p-4 rounded bg-light mx-auto" style={{ maxWidth: '500px' }}>
        <div className="mb-3">
          <label className="form-label">Application Name: </label>
          <input
            type="text"
            className="form-control"
            value={applicationName}
            onChange={(e) => setApplicationName(e.target.value)}
            required
          />
        </div>
        <div className="mb-3">
          <label className="form-label">Gender: </label>
          <select
            className="form-select"
            value={gender}
            onChange={(e) => setGender(e.target.value)}
            required
          >
            <option value="">Select Gender</option>
            <option value="Male">Male</option>
            <option value="Female">Female</option>
          </select>
        </div>
        <div className="mb-3">
          <label className="form-label">Government ID Type: </label>
          <input
            type="text"
            className="form-control"
            value={govtIDType}
            onChange={(e) => setGovtIDType(e.target.value)}
            required
          />
        </div>
        <div className="mb-3">
          <label className="form-label">Date of Application: </label>
          <input
            type="date"
            className="form-control"
            onChange={(e) => setDate(e.target.value)}
            required
          />
        </div>
        <div className="mb-3">
          <label className="form-label">State: </label>
          <input
            type="text"
            className="form-control"
            value={newstate}
            onChange={(e) => setNewState(e.target.value)}
            required
          />
        </div>
        <div className="mb-3">
          <label className="form-label">Load Applied: </label>
          <input
            type="number"
            className="form-control"
            value={loadApplied}
            onChange={handleLoadChange}
            required
          />
          {error && <div className="text-danger mt-1">{error}</div>} {/* Display error if value is invalid */}
        </div>
        <div className="mb-3">
          <label className="form-label">Status: </label>
          <input
            type="text"
            className="form-control"
            value={status}
            onChange={(e) => setStatus(e.target.value)}
            required
          />
        </div>
        <button type="submit" className="btn btn-primary w-100" > {/* Disable the button if there's an error */}
          Add User
        </button>
      </form>
    </div>
  );
};

export default AddUser;
