import logo from './logo.svg';
import './App.css';
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import AppRoutes from './routes'; // Adjusted import to match the correct file
import Signup from './components/signup';
import Login from './components/login';
import ViewItems from './components/viewItems';
import AddItemForm from './components/addItem';
import SearchItem from './components/searchItem';

function App() {
  return (
    <Router>
      <div className="App">
        <header className="App-header">
         
        </header>
        <Routes>
          <Route path="/signup" element={<Signup />} />
          <Route path="/login" element={<Login />} />
          <Route path="/view-items" element={<ViewItems />} />
          <Route path="/add-item" element={<AddItemForm />} />
          <Route path="/search-item" element={<SearchItem />} />
          <Route path="/" element={<AppRoutes />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;