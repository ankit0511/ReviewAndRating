import React from 'react';
import { FaMapMarkerAlt } from 'react-icons/fa';
import './css/SearchBar.css';

const SearchBar = ({ openModal, onSortChange }) => {
  return (
    <div className="search-bar">
      <div className="search-container">
        <div className="input-group">
          <p className="select-city-label">Select City</p>
          <div className="city-input">
            <input type="text" value="Indore, Madhya Pradesh, India" readOnly />
            <FaMapMarkerAlt className="location-icon" />
          </div>
        </div>
        <div className="search-actions">
          <button className="find-button">Find Company</button>
          <button className="add-button" onClick={openModal}> + Add Company</button>
        </div>
        <div className="input-group">
          <p className="sort-label">Sort By</p>
          <div className="sort">
            <select onChange={(e) => onSortChange(e.target.value)}>
              <option value="name">Name</option>
              <option value="rating">Rating</option>
              <option value="date">Date</option>
            </select>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SearchBar;