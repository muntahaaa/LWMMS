import React from 'react';
import { Route, Routes } from 'react-router-dom';
import Signup from './components/auth/signup';
import Login from './components/auth/login';
import ViewItems from './components/items/viewItems';
import AddItem from './components/items/addItem';


const AppRoutes = () => (
  <Routes>
    <Route path="/signup" element={<Signup />} />
    <Route path="/login" element={<Login />} />
    <Route path="/view-items" element={<ViewItems />} />
    <Route path="/add-item" element={<AddItem />} />
    <Route path="/" element={<Signup />} /> {/* Default route */}
  </Routes>
);

export default AppRoutes;