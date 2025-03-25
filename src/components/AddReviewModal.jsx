import React, { useState } from 'react';
import { FaTimes, FaStar } from 'react-icons/fa';
import './css/AddReviewModal.css';

const AddReviewModal = ({ closeModal, onAddReview }) => {
  const [rating, setRating] = useState(0);
  const [review, setReview] = useState({ 
    name: '', 
    date: '', 
    description: '', 
    image: null 
  });
  const [errors, setErrors] = useState({});
  const [today] = useState(new Date().toISOString().split('T')[0]);

  const validateForm = () => {
    const newErrors = {};
    let isValid = true;

    if (!review.name.trim()) {
      newErrors.name = 'Name is required';
      isValid = false;
    }

    if (!review.date) {
      newErrors.date = 'Date is required';
      isValid = false;
    } else {
      const selectedDate = new Date(review.date);
      const currentDate = new Date();
      
      if (selectedDate > currentDate) {
        newErrors.date = 'Date cannot be in the future';
        isValid = false;
      }
    }

    if (!review.description.trim()) {
      newErrors.description = 'Review description is required';
      isValid = false;
    } else if (review.description.trim().length < 20) {
      newErrors.description = 'Review must be at least 20 characters';
      isValid = false;
    }

    if (rating === 0) {
      newErrors.rating = 'Please select a rating';
      isValid = false;
    }

    setErrors(newErrors);
    return isValid;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (validateForm()) {
      const newReview = {
        name: review.name,
        date: review.date,
        description: review.description,
        image: review.image || 'https://via.placeholder.com/50',
        rating: rating
      };
      
      onAddReview(newReview);
      closeModal();
    }
  };

  const handleReviewChange = (e) => {
    const { name, value } = e.target;
    setReview({ ...review, [name]: value });
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors({...errors, [name]: ''});
    }
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      // Validate image file
      if (!file.type.match('image.*')) {
        setErrors({...errors, image: 'Please upload an image file'});
        return;
      }
      if (file.size > 2 * 1024 * 1024) { // 2MB limit
        setErrors({...errors, image: 'Image size should be less than 2MB'});
        return;
      }
      
      const reader = new FileReader();
      reader.onload = (event) => {
        setReview({ ...review, image: event.target.result });
        setErrors({...errors, image: ''});
      };
      reader.readAsDataURL(file);
    }
  };

  const handleRatingChange = (selectedRating) => {
    setRating(selectedRating);
    if (errors.rating) {
      setErrors({...errors, rating: ''});
    }
  };

  return (
    <div className="add-review-modal-overlay">
      <div className="add-review-modal">
        <div className="add-review-modal-header">
          <h2>Add Review</h2>
          <button className="add-review-close-icon" onClick={closeModal}>
            <FaTimes />
          </button>
        </div>
        
        <form onSubmit={handleSubmit}>
          <div className="add-review-form-group">
            <label>Your Name</label>
            <input
              type="text"
              name="name"
              placeholder="Enter your name"
              value={review.name}
              onChange={handleReviewChange}
              className={errors.name ? 'error' : ''}
            />
            {errors.name && <span className="error-message">{errors.name}</span>}
          </div>
          
          <div className="add-review-form-group">
            <label>Date</label>
            <input
              type="date"
              name="date"
              value={review.date}
              onChange={handleReviewChange}
              max={today}
              className={errors.date ? 'error' : ''}
            />
            {errors.date && <span className="error-message">{errors.date}</span>}
          </div>
          
          <div className="add-review-form-group">
            <label>Description</label>
            <textarea
              name="description"
              placeholder="Write your review (minimum 20 characters)..."
              value={review.description}
              onChange={handleReviewChange}
              rows="4"
              className={errors.description ? 'error' : ''}
            />
            {errors.description && <span className="error-message">{errors.description}</span>}
          </div>
          
          <div className="add-review-form-group">
            <label>Upload Image (Optional)</label>
            <input
              type="file"
              accept="image/*"
              onChange={handleImageChange}
              style={{ display: 'none' }}
              id="add-review-image-upload"
            />
            <label 
              htmlFor="add-review-image-upload" 
              className={`add-review-upload-button ${errors.image ? 'error' : ''}`}
            >
              {review.image ? (
                <img src={review.image} alt="Uploaded" className="add-review-uploaded-image" />
              ) : (
                <span>Choose Image</span>
              )}
            </label>
            {errors.image && <span className="error-message">{errors.image}</span>}
          </div>
          
          <div className="add-review-form-group">
            <label>Rating</label>
            <div className="add-review-star-rating">
              {[1, 2, 3, 4, 5].map((star) => (
                <FaStar
                  key={star}
                  className={star <= rating ? 'add-review-star active' : 'add-review-star'}
                  onClick={() => handleRatingChange(star)}
                />
              ))}
              <span className="rating-text">{rating > 0 ? `${rating} star${rating > 1 ? 's' : ''}` : 'Select rating'}</span>
            </div>
            {errors.rating && <span className="error-message">{errors.rating}</span>}
          </div>
          
          <div className="add-review-form-actions">
            <button type="submit" className="submit-button">
              Submit Review
            </button>
          </div>
        </form>
        
        <div className="add-review-design-circle add-review-bottom-circle"></div>
        <div className="add-review-design-circle add-review-upper-circle"></div>
      </div>
    </div>
  );
};

export default AddReviewModal;