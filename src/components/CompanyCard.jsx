import React from 'react';
import { useNavigate } from 'react-router-dom';
import './css/CompanyCard.css';

const CompanyCard = ({ company }) => {
  const navigate = useNavigate();

  const handleDetailReview = () => {
    navigate(`/company/${company.id}`); // Navigate to the company review page
  };

  return (
    <div className="company-card">
      <img src={company.image} alt={company.name} className="company-image" />
      <div className="company-details">
        <h3>{company.name}</h3>
        <p>{company.address}</p>
        <div className="rating-reviews">
          <span className="rating">{company.rating}</span>
          <span className="stars">★★★★★</span>
          <span className="reviews">{company.reviews}</span>
        </div>
      </div>
      <div className="company-footer">
        <p className="founded">Founded on {company.founded}</p>
        <button className="detail-button" onClick={handleDetailReview}>Detail Review</button>
      </div>
    </div>
  );
};

export default CompanyCard;