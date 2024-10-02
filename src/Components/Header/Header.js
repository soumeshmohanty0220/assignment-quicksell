import React, { useState, useEffect, useRef } from 'react';
import './Header.css';
import { ReactComponent as DisplayIcon } from '../../assets/Display.svg';
import { ReactComponent as DownIcon } from '../../assets/down.svg';

const Header = ({ grouping, ordering, onGroupingChange, onOrderingChange }) => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);

  const toggleDropdown = () => setIsDropdownOpen(prevState => !prevState);

  const handleClickOutside = (event) => {
    if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
      setIsDropdownOpen(false);
    }
  };

  const handleSelectChange = (callback) => (event) => {
    callback(event.target.value);
    setIsDropdownOpen(false);
  };

  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  return (
    <div className="header">
      <div className="dropdown-container">
        <button className="dropdown-toggle" onClick={toggleDropdown}>
          <DisplayIcon className="icon" />
          Display
          <DownIcon className="icon" />
        </button>
        {isDropdownOpen && (
          <div className="dropdown-menu" ref={dropdownRef}>
            <div className="dropdown-item">
              <span>Grouping</span>
              <select 
                value={grouping} 
                onChange={handleSelectChange(onGroupingChange)}
              >
                <option value="status">Status</option>
                <option value="user">User</option>
                <option value="priority">Priority</option>
              </select>
            </div>
            <div className="dropdown-item">
              <span>Ordering</span>
              <select 
                value={ordering} 
                onChange={handleSelectChange(onOrderingChange)}
              >
                <option value="priority">Priority</option>
                <option value="title">Title</option>
              </select>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Header;