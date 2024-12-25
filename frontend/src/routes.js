import React from 'react';
import { Route, Routes } from 'react-router-dom';
import Signup from './components/signup';
import Login from './components/login';
import ViewItems from './components/viewItems';
import AddItemForm from './components/addItem';
import SearchItem from './components/searchItem';

const AppRoutes = () => (
  <Routes>
    <Route path="/signup" element={<Signup />} />
    <Route path="/login" element={<Login />} />
    <Route path="/view-items" element={<ViewItems />} />
    <Route path="/add-item" element={<AddItemForm />} />
    <Route path="/search-item" element={<SearchItem />} />
    <Route path="/" element={<Signup />} /> {/* Default route */}
  </Routes>
);

export default AppRoutes;