import { useState, useEffect } from "react";
import { DateRangePicker } from "react-date-range";
import { Link } from "react-router-dom";
import "react-date-range/dist/styles.css";
import "react-date-range/dist/theme/default.css";
import "bootstrap/dist/css/bootstrap.min.css";
import ConnectionChart from "./ConnectionChart";

const DisplayItems = ({ usersData, setUsersData }) => {
  const [searchId, setSearchId] = useState("");
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());

  useEffect(() => {
    localStorage.setItem("myusersData", JSON.stringify(usersData));
  }, [usersData]);

  const deleteRow = (id, status) => {
    if (status.toLowerCase() === "rejected") {
      const updatedArray = usersData.filter((item) => item.ID !== id);
      setUsersData(updatedArray);
    } else {
      alert("User with only Rejected status can be deleted");
    }
  };

  const convertDateFormat = (dateString) => {
    const [day, month, year] = dateString.split("/");
    return `${month}/${day}/${year}`;
  };

  const handleSearchChange = (e) => {
    setSearchId(e.target.value);
  };

  const handleSelect = (date) => {
    setStartDate(date.selection.startDate);
    setEndDate(date.selection.endDate);
  };

  const selectionRange = {
    startDate: startDate,
    endDate: endDate,
    key: "selection",
  };

  let filteredArray = usersData.filter((item) => {
    const itemDate = new Date(convertDateFormat(item.Date_of_Application));
    if (startDate && endDate) {
      return itemDate >= startDate && itemDate <= endDate;
    } else if (startDate) {
      return itemDate >= startDate;
    } else if (endDate) {
      return itemDate <= endDate;
    }
    return true;
  });

  return (
    <div className="container mt-5">
      <h2 className="mb-4">Electricity Dashboard</h2>

      <div className="form-group">
        <input
          type="text"
          className="form-control mb-3"
          placeholder="Search by ID"
          value={searchId}
          onChange={handleSearchChange}
        />
      </div>

      <div className="mb-4">
        <DateRangePicker ranges={[selectionRange]} onChange={handleSelect} />
      </div>
      
      
      <Link to="/chart" className="btn btn-info mb-4 mx-2" >View Chart</Link>

      <Link to="/add-user" className="btn btn-primary mb-4">
        Add New User
      </Link>

      <table className="table table-striped table-bordered">
        <thead className="thead-dark">
          <tr>
            <th>Id</th>
            <th>Application Name</th>
            <th>Gender</th>
            <th>Government ID Type</th>
            <th>State</th>
            <th>Loan Applied</th>
            <th>Date of Application</th>
            <th>Status</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {(filteredArray.length === 0 ? usersData : filteredArray)
            .filter(
              (item) => searchId === "" || item.ID.toString().includes(searchId)
            )
            .map((item) => (
              <tr key={item.ID}>
                <td>{item.ID}</td>
                <td>{item.Applicant_Name}</td>
                <td>{item.Gender}</td>
                <td>{item.GovtID_Type}</td>
                <td>{item.State}</td>
                <td>{item.Load_Applied}</td>
                <td>{item.Date_of_Application}</td>
                <td>{item.Status}</td>
                <td>
                  <Link to={`/edit/${item.ID}`} className="btn btn-info btn-sm mr-2 mx-2">
                    Edit
                  </Link>
                  <button
                    className="btn btn-danger btn-sm"
                    onClick={() => deleteRow(item.ID, item.Status)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
        </tbody>
      </table>
    </div>
  );
};

export default DisplayItems;
