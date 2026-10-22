import React from 'react';
import { NavLink } from 'react-router-dom';

const NavBar = () => {
  const activeStyle = {
    color: 'red',
    fontWeight: 'bold',
  };

  return (
    <nav style={{ display: 'flex', gap: '20px', padding: '10px', background: '#f0f0f0' }}>
      <NavLink to="/" style={({ isActive }) => (isActive ? activeStyle : undefined)} end>
        Trang chủ
      </NavLink>
      <NavLink to="/questions" style={({ isActive }) => (isActive ? activeStyle : undefined)}>
        Ngân hàng câu hỏi
      </NavLink>
      <NavLink to="/history" style={({ isActive }) => (isActive ? activeStyle : undefined)}>
        Lịch sử
      </NavLink>
    </nav>
  );
};

export default NavBar;