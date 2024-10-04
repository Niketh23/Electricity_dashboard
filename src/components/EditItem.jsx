import React, { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";

const EditItem = ({ usersData, setUsersData }) => {
  const { id } = useParams(); // Get the id from URL
  const navigate = useNavigate();

  // Find the item based on id
  const item = usersData.find((item) => item.ID.toString() === id);

  // State for editable fields
  const [applicationName, setApplicationName] = useState(
    item?.Applicant_Name || ""
  );
  const [gender, setGender] = useState(item?.Gender || "");
  const [newState, setNewState] = useState(item?.State || "");
  const [loadApplied, setLoadApplied] = useState(item?.Load_Applied || "");
  const [status, setStatus] = useState(item?.Status || "");
  const [error, setError] = useState("");

  const handleLoadChange = (e) => {
    const value = e.target.value;
    // Ensure loadApplied is always less than 200
    if (value === "" || parseInt(value) < 200) {
      setLoadApplied(value);
      setError(""); // Clear error if valid input
    } else {
      setError("Load Applied must be less than 200");
    }
  };

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();

    // Update the usersData with the new values for application_name and status
    const updatedArray = usersData.map((item) =>
      item.ID.toString() === id
        ? {
            ...item,
            ID: id,
            Applicant_Name: applicationName,
            Gender: gender,
            GovtID_Type: item.GovtID_Type,
            Date_of_Application: item.Date_of_Application,
            State: newState,
            Load_Applied: loadApplied,
            Status: status,
          }
        : item
    );

    setUsersData(updatedArray);

    // Navigate back to the home page after updating
    navigate("/");
  };

  return (
    <div className="container mt-3">
      <h1 className="mb-4 text-center">Edit Application</h1>
      {item ? (
        <form
          onSubmit={handleSubmit}
          className="mx-auto p-4 border border-2 rounded shadow-sm"
          style={{ maxWidth: "450px", borderColor: "#007bff" }}
        >
          <div className="mb-3">
            <label className="form-label">User ID: </label>
            <span className="form-control">{item.ID}</span>
          </div>

          <div className="mb-3">
            <label className="form-label">Application Name: </label>
            <input
              type="text"
              className="form-control"
              value={applicationName}
              onChange={(e) => setApplicationName(e.target.value)}
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
            <span className="form-control">{item.GovtID_Type}</span>
          </div>

          <div className="mb-3">
            <label className="form-label">Date of Application: </label>
            <span className="form-control">{item.Date_of_Application}</span>
          </div>

          <div className="mb-3">
            <label className="form-label">State: </label>
            <input
              type="text"
              className="form-control"
              value={newState}
              onChange={(e) => setNewState(e.target.value)}
            />
          </div>

          <div className="mb-3">
            <label className="form-label">Load Applied: </label>
            <input
              type="number"
              className="form-control"
              value={loadApplied}
              onChange={handleLoadChange}
            />
            {error && <div className="text-danger mt-1">{error}</div>}
          </div>

          <div className="mb-3">
            <label className="form-label">Status: </label>
            <input
              type="text"
              className="form-control"
              value={status}
              onChange={(e) => setStatus(e.target.value)}
            />
          </div>

          <button type="submit" className="btn btn-primary w-100">
            Save Changes
          </button>
        </form>
      ) : (
        <p className="text-danger text-center">No item found with the specified ID.</p>
      )}
    </div>
  );
};

export default EditItem;
