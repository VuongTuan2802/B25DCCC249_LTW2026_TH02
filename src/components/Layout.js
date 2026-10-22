import React from 'react';
import { Outlet } from 'react-router-dom';
import NavBar from './NavBar';

const Layout = () => {
  return (
    <div>
      <NavBar />
      <div style={{ padding: '20px' }}>
        <Outlet />
      </div>
    </div>
  );
};

export default Layout;