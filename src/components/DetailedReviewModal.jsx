import React from 'react';
import { FaTimes } from 'react-icons/fa';
import './css/DetailedReviewModal.css';

const DetailedReviewModal = ({ closeModal, reviews }) => {
  return (
    <div className="modal-overlay">
      <div className="modal">
        <div className="modal-header">
          <h2>Graffersid Web and App Development</h2>
          <button className="close-icon" onClick={closeModal}>
            <FaTimes />
          </button>
        </div>
        <div className="modal-content">
          <p>© 8f6, Shekhar Central, Mandrama Ganj, Ali road, New Pabala, Indore (M.P.)</p>
          <div className="rating">
            <span>4.5 ★★★★</span>
            <span>{reviews.length} Reviews</span>
          </div>
          <div className="reviews-list">
            {reviews.map((review, index) => (
              <div key={index} className="review">
                <div className="review-header">
                  <img src={review.image} alt={review.name} className="review-image" />
                  <div>
                    <h3>{review.name}</h3>
                    <p className="date">{review.date}</p>
                  </div>
                </div>
                <p className="review-text">{review.description}</p>
                <div className="review-rating">
                  Rating: {review.rating} ★
                </div>
              </div>
            ))}
          </div>
          <button className="add-review-button">Add Review</button>
        </div>
      </div>
    </div>
  );
};

export default DetailedReviewModal;