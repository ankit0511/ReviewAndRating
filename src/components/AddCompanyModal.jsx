import React, { useState, useEffect } from 'react';
import { FaTimes, FaMapMarkerAlt, FaCloudUploadAlt } from 'react-icons/fa';
import './css/AddCompanyModal.css';

const AddCompanyModal = ({ closeModal, onAddCompany }) => {
  const [image, setImage] = useState(null);
  const [companyName, setCompanyName] = useState('');
  const [location, setLocation] = useState('');
  const [foundedDate, setFoundedDate] = useState('');
  const [errors, setErrors] = useState({});
  const [today] = useState(new Date().toISOString().split('T')[0]);

  useEffect(() => {
    // Set default founded date to today
    setFoundedDate(today);
  }, [today]);

  const validateForm = () => {
    const newErrors = {};
    let isValid = true;

    if (!companyName.trim()) {
      newErrors.companyName = 'Company name is required';
      isValid = false;
    }

    if (!location.trim()) {
      newErrors.location = 'Location is required';
      isValid = false;
    }

    if (!foundedDate) {
      newErrors.foundedDate = 'Founded date is required';
      isValid = false;
    } else {
      const selectedDate = new Date(foundedDate);
      const currentDate = new Date();
      
      if (selectedDate > currentDate) {
        newErrors.foundedDate = 'Founded date cannot be in the future';
        isValid = false;
      }
    }

    setErrors(newErrors);
    return isValid;
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (validateForm()) {
      const newCompany = {
        id: Date.now(),
        name: companyName,
        address: location,
        rating: 0,
        reviews: "0 Reviews",
        founded: foundedDate,
        image: image || 'https://mir-s3-cdn-cf.behance.net/projects/404/300757181761085.Y3JvcCwyOTg1LDIzMzUsMjM2LDA.jpg',
      };

      onAddCompany(newCompany);
      closeModal();
    }
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      if (!file.type.match('image.*')) {
        setErrors({...errors, image: 'Please upload an image file'});
        return;
      }
      if (file.size > 2 * 1024 * 1024) { // 2MB limit
        setErrors({...errors, image: 'Image size should be less than 2MB'});
        return;
      }
      setImage(URL.createObjectURL(file));
      setErrors({...errors, image: ''});
    }
  };

  return (
    <div className="modal-overlay">
      <div className="modal">
        <div className="modal-header">
          <h2>Add Company</h2>
          <button className="close-icon" onClick={closeModal}>
            <FaTimes />
          </button>
        </div>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Company Name</label>
            <input
              type="text"
              placeholder="Enter company name"
              value={companyName}
              onChange={(e) => setCompanyName(e.target.value)}
              className={errors.companyName ? 'error' : ''}
            />
            {errors.companyName && <span className="error-message">{errors.companyName}</span>}
          </div>
          <div className="form-group">
            <label>Location</label>
            <div className="location-input">
              <input
                type="text"
                placeholder="Enter location"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                className={errors.location ? 'error' : ''}
              />
              <FaMapMarkerAlt className="location-marker" />
            </div>
            {errors.location && <span className="error-message">{errors.location}</span>}
          </div>
          <div className="form-group">
            <label>Founded On</label>
            <input
              type="date"
              value={foundedDate}
              onChange={(e) => setFoundedDate(e.target.value)}
              max={today}
              className={errors.foundedDate ? 'error' : ''}
            />
            {errors.foundedDate && <span className="error-message">{errors.foundedDate}</span>}
          </div>
          <div className="form-group">
            <label>Add Image (Optional)</label>
            <div className="image-upload">
              <input
                type="file"
                accept="image/*"
                onChange={handleImageChange}
                style={{ display: 'none' }}
                id="image-upload"
              />
              <label htmlFor="image-upload" className="upload-button">
                {image ? (
                  <img src={image} alt="Uploaded" className="uploaded-image" />
                ) : (
                  <>
                    <FaCloudUploadAlt size={24} />
                    <span>Click to upload image</span>
                  </>
                )}
              </label>
            </div>
            {errors.image && <span className="error-message">{errors.image}</span>}
          </div>
          <div className="form-actions">
            <button type="submit">Save Company</button>
          </div>
        </form>
        <div className="design-circle bottom-circle"></div>
        <div className="design-circle upper-circle"></div>
      </div>
    </div>
  );
};

export default AddCompanyModal;