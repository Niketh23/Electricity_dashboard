import React, { useState } from "react";
import { BarChart, Bar, XAxis, YAxis, Tooltip, Legend, CartesianGrid, ResponsiveContainer } from "recharts";
import { Form } from "react-bootstrap";

const ConnectionChart = ({ usersData }) => {
  const [selectedStatus, setSelectedStatus] = useState("Pending");

  // Function to filter data by selected status and group by month
  const getFilteredData = (status) => {
    const months = [
      "January", "February", "March", "April", "May", "June",
      "July", "August", "September", "October", "November", "December"
    ];

    // Helper function to extract month and year from a date string
    const extractMonthYear = (dateString) => {
      const [day, month, year] = dateString.split("/");
      return `${months[parseInt(month) - 1]} ${year}`;
    };

    // Filter data based on selected status
    const filteredData = usersData.filter((item) => item.Status.toLowerCase() === status.toLowerCase());

    // Group data by month
    const groupedData = filteredData.reduce((acc, item) => {
      const monthYear = extractMonthYear(item.Date_of_Application);
      if (!acc[monthYear]) {
        acc[monthYear] = 0;
      }
      acc[monthYear]++;
      return acc;
    }, {});

    // Convert the grouped data into an array suitable for recharts
    return Object.entries(groupedData).map(([key, value]) => ({
      month: key,
      count: value,
    }));
  };

  const handleStatusChange = (e) => {
    setSelectedStatus(e.target.value);
  };

  // Get data for the selected status
  const chartData = getFilteredData(selectedStatus);

  return (
    <div className="container mt-5">
      <h3>Connection Requests Per Month</h3>
      {/* Dropdown for selecting the status */}
      <Form.Group>
        <Form.Label>Select Status</Form.Label>
        <Form.Control as="select" value={selectedStatus} onChange={handleStatusChange}>
          <option value="Pending">Pending</option>
          <option value="Approved">Approved</option>
          <option value="Rejected">Rejected</option>
        </Form.Control>
      </Form.Group>

      {/* Responsive Bar Chart */}
      <ResponsiveContainer width="100%" height={400}>
        <BarChart data={chartData}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="month" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Bar dataKey="count" fill="#8884d8" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default ConnectionChart;
