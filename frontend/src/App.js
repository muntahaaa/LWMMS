import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './components/layout/Home';
import Signup from './components/auth/signup';
import Login from './components/auth/login';
import AddItem from './components/items/addItem';
import Dashboard from './components/layout/Dashboard';
import ViewItems from './components/items/viewItems';
import UpdateItem from './components/items/updateItem';
function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/login" element={<Login />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/add-item" element={<AddItem />} />
          <Route path="/view-items" element={<ViewItems />} />
          <Route path="/update-item/:id" element={<UpdateItem />} />
          {/*
          
          <Route path="/search-item" element={<SearchItem />} /> */}
        </Routes>
      </div>
    </Router>
  );
}


export default App;