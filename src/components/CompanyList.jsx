import React from 'react';
import CompanyCard from './CompanyCard';
import './css/CompanyList.css';

const CompanyList = ({ companies, sortBy }) => {
  // Sort companies based on the selected criteria
  const sortedCompanies = [...companies].sort((a, b) => {
    if (sortBy === 'name') {
      return a.name.localeCompare(b.name);
    } else if (sortBy === 'rating') {
      return b.rating - a.rating;
    } else if (sortBy === 'date') {
      return new Date(b.founded) - new Date(a.founded);
    }
    return 0;
  });

  return (
    <div className="company-list">
      <h2>Result Found: {sortedCompanies.length}</h2>
      {sortedCompanies.map((company) => (
        <CompanyCard key={company.id} company={company} />
      ))}
    </div>
  );
};

export default CompanyList;