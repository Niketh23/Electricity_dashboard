import './App.css'
import "bootstrap/dist/css/bootstrap.min.css";
import DisplayItems from './components/DisplayItems'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import EditItem from './components/EditItem';
import AddUser from './components/AddUser';
import data from "../src/users.json";
import { useState } from 'react';
import ConnectionChart from './components/ConnectionChart';

function App() {
  const [usersData, setUsersData] = useState(data);
  return (
    <Router>
    <Routes>
      {/* Home page to display items */}
      <Route path="/" element={<DisplayItems usersData={usersData} setUsersData={setUsersData}/>} />
      
      {/* Edit page to edit specific item by id */}
      <Route path="/edit/:id" element={<EditItem  usersData={usersData} setUsersData={setUsersData} />} />

      {/* Add user page */}
      <Route path="/add-user" element={<AddUser usersData={usersData} setUsersData={setUsersData} />} />

      <Route path="/chart" element={<ConnectionChart usersData={usersData} />} />
    </Routes>
  </Router>
  )
}

export default App
