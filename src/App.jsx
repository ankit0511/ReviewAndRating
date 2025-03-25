import React, { useState } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import SearchBar from './components/SearchBar';
import CompanyList from './components/CompanyList';
import AddCompanyModal from './components/AddCompanyModal';
import CompanyReview from './pages/CompanyReview';
import './index.css';

import logo from "../src/Images/logo.png"
import logo2 from "../src/Images/logo2.png"
import logo3 from "../src/Images/logo3.png"
const App = () => {
  const [isModalOpen, setIsModalOpen] = useState(false); // For AddCompanyModal
  const [sortBy, setSortBy] = useState('name'); // For sorting companies
  const [searchQuery, setSearchQuery] = useState(''); // For search query
  const [companies, setCompanies] = useState([
    {
      id: 1,
      name: "Graffersid Web and App Development",
      address: "@ 816, Shekhar Central, Manarama Ganj, AB road, New Palasia, Indore (M.P.)",
      rating: 4.5,
      reviews: "41 Reviews",
      founded: "2016-01-01",
      image: logo,
    },
    {
      id: 2,
      name: "Code Tech Company",
      address: "@ 414, Kanha Appartment, Bhawarkua, Indore (M.P.)",
      rating: 4.2,
      reviews: "35 Reviews",
      founded: "2018-05-15",
      image: logo2,
    },
    {
      id: 3,
      name: "ZegoCloud Tech Company",
      address: "@ 414, Geeta bhawan Square , Indore (M.P.)",
      rating: 4.8,
      reviews: "41 Reviews",
      founded: "2020-07-05",
      image: logo3,
    },
  ]);

  // Open/close modals
  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  // Add a new company
  const handleAddCompany = (newCompany) => {
    setCompanies((prevCompanies) => [...prevCompanies, newCompany]);
  };

  // Handle search query
  const handleSearch = (query) => {
    setSearchQuery(query);
  };

  // Filter companies based on search query
  const filteredCompanies = companies.filter((company) =>
    company.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <BrowserRouter>
      <div className="app">
        <Navbar />
        <Routes>
          <Route
            path="/"
            element={
              <>
                <SearchBar
                  openModal={openModal}
                  onSortChange={setSortBy}
                  onSearch={handleSearch}
                />
                <CompanyList companies={filteredCompanies} sortBy={sortBy} />
              </>
            }
          />
          <Route path="/company/:id" element={<CompanyReview />} />
        </Routes>
        {isModalOpen && (
          <AddCompanyModal closeModal={closeModal} onAddCompany={handleAddCompany} />
        )}
      </div>
    </BrowserRouter>
  );
};

export default App;





// import logo from "../src/Images/logo.png"
// import logo2 from "../src/Images/logo2.png"