import React from 'react';
import { Route, Routes } from 'react-router-dom';
import Signup from './components/auth/signup';
import Login from './components/auth/login';
import ViewItems from './components/items/viewItems';
import AddItemForm from './components/items/addItem';
import SearchItem from './components/items/searchItem';

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