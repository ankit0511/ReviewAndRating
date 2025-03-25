import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import AddReviewModal from '../components/AddReviewModal';
import './css/CompanyReview.css';
import logo from '../Images/logo.png';
import logo2 from '../Images/logo2.png';
import logo3 from '../Images/logo3.png';

const companiesData = [
  {
    id: 1,
    name: "Graffersid Web and App Development",
    address: "@ 816, Shekhar Central, Manarama Ganj, AB road, New Palasia, Indore (M.P.)",
    rating: "4.5",
    reviews: "41 Reviews",
    founded: "2016-01-01",
    image: logo,
    reviewsList: [
      {
        name: "Jargue Watson",
        date: "01-01-2022, 14:33",
        review: "Graffersid has been an exceptional partner for our web development needs. Their team delivered our e-commerce platform ahead of schedule with excellent attention to detail. The user interface is intuitive, and the backend performance is outstanding. Throughout the project, their communication was clear and consistent, making the entire process smooth and efficient.",
        userImage: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQjDGMp734S91sDuUFqL51_xRTXS15iiRoHew&s",
        userRating: "4.5",
      },
      {
        name: "Sarah Johnson",
        date: "15-03-2022, 09:15",
        review: "Working with Graffersid on our mobile app was a game-changer for our business. Their developers demonstrated deep expertise in React Native and implemented complex features with ease. The app performance is flawless across all devices, and their post-launch support has been responsive and helpful. I would highly recommend them for any mobile development project.",
        userImage: "https://randomuser.me/api/portraits/women/44.jpg",
        userRating: "5.0",
      },
      {
        name: "Michael Chen",
        date: "22-05-2022, 16:45",
        review: "Graffersid rebuilt our legacy system with modern technologies, and the results have been transformative. Their team took the time to understand our business processes and suggested improvements we hadn't even considered. The new system has reduced our operational costs by 30% and improved customer satisfaction significantly. Their expertise in database optimization was particularly impressive.",
        userImage: "https://randomuser.me/api/portraits/men/32.jpg",
        userRating: "4.0",
      },
      {
        name: "Emily Rodriguez",
        date: "10-07-2022, 11:20",
        review: "The UI/UX design services from Graffersid exceeded our expectations. They conducted thorough user research and created designs that perfectly balance aesthetics with functionality. Our conversion rates have increased by 45% since implementing their designs. Their attention to accessibility standards was particularly commendable, making our platform usable for all customers.",
        userImage: "https://randomuser.me/api/portraits/women/63.jpg",
        userRating: "4.5",
      },
    ],
  },
  {
    id: 2,
    name: "Code Tech Company",
    address: "@ 414, Kanha Appartment, Bhawarkua, Indore (M.P.)",
    rating: "4.2",
    reviews: "35 Reviews",
    founded: "2018-05-15",
    image: logo2,
    reviewsList: [
      {
        name: "John Doe",
        date: "10-02-2023, 12:45",
        review: "Code Tech delivered our enterprise software solution with remarkable efficiency. Their team demonstrated strong expertise in cloud architecture and microservices, implementing scalable solutions that have handled our peak loads without issue. Their documentation was thorough, and knowledge transfer sessions were comprehensive, enabling our team to maintain the system effectively.",
        userImage: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=600&auto=format&fit=crop&q=60",
        userRating: "4.0",
      },
      {
        name: "David Wilson",
        date: "05-04-2023, 14:30",
        review: "Code Tech's DevOps team transformed our deployment pipeline, reducing our release cycles from weeks to days. Their implementation of CI/CD processes and containerization has significantly improved our development velocity. They also provided excellent training for our internal team, ensuring we could maintain the infrastructure independently after project completion.",
        userImage: "https://randomuser.me/api/portraits/men/75.jpg",
        userRating: "4.5",
      },
      {
        name: "Lisa Thompson",
        date: "18-06-2023, 10:15",
        review: "We engaged Code Tech for a complex data migration project, and they handled it with exceptional professionalism. Their team developed custom ETL processes that preserved data integrity while transforming our legacy formats. The migration was completed with zero downtime, and their thorough testing ensured no data loss or corruption occurred during the process.",
        userImage: "https://randomuser.me/api/portraits/women/68.jpg",
        userRating: "4.0",
      },
    ],
  },
  {
    id: 3,
    name: "ZegoCloud Tech Company",
    address: "@ 414, Geeta bhawan Square , Indore (M.P.)",
    rating: "4.8",
    reviews: "41 Reviews",
    founded: "2020-07-05",
    image: logo3,
    reviewsList: [
      {
        name: "Alice Brown",
        date: "15-03-2023, 09:20",
        review: "ZegoCloud implemented a comprehensive cloud security solution for our organization that has significantly strengthened our infrastructure. Their team conducted a thorough security audit before implementation, identifying vulnerabilities we weren't aware of. The new system has withstood multiple penetration tests, and their 24/7 monitoring has detected and prevented several potential breaches.",
        userImage: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=600&auto=format&fit=crop&q=60",
        userRating: "5.0",
      },
      {
        name: "Robert Garcia",
        date: "28-04-2023, 15:40",
        review: "The AI solutions developed by ZegoCloud have revolutionized our customer service operations. Their natural language processing implementation reduced our response times by 60% while maintaining high customer satisfaction scores. The machine learning models they developed continue to improve over time, adapting to new customer queries and business scenarios with minimal maintenance required.",
        userImage: "https://randomuser.me/api/portraits/men/22.jpg",
        userRating: "4.5",
      },
      {
        name: "Jennifer Lee",
        date: "12-07-2023, 13:10",
        review: "ZegoCloud's IoT platform has enabled us to gather and analyze equipment data across our manufacturing facilities in real-time. Their predictive maintenance algorithms have reduced our downtime by 40% and saved significant costs in unnecessary part replacements. The dashboard they created provides actionable insights that our operations team uses daily to optimize production efficiency.",
        userImage: "https://randomuser.me/api/portraits/women/90.jpg",
        userRating: "5.0",
      },
      {
        name: "Thomas Smith",
        date: "05-09-2023, 11:05",
        review: "Working with ZegoCloud on our blockchain implementation was an excellent experience. They navigated the complexities of smart contract development with expertise, ensuring our business logic was accurately represented while maintaining security best practices. Their documentation and training materials have enabled our team to continue developing on the platform they established.",
        userImage: "https://randomuser.me/api/portraits/men/45.jpg",
        userRating: "4.5",
      },
      {
        name: "Olivia Martinez",
        date: "20-10-2023, 16:25",
        review: "ZegoCloud's data analytics team helped us unlock valuable insights from our customer data that were previously overlooked. Their custom visualization tools and predictive models have directly contributed to a 25% increase in our marketing campaign effectiveness. Their ability to explain complex data concepts to our non-technical stakeholders was particularly valuable for organizational buy-in.",
        userImage: "https://randomuser.me/api/portraits/women/33.jpg",
        userRating: "5.0",
      },
    ],
  },
];

const CompanyReview = () => {
  const { id } = useParams();
  const [company, setCompany] = useState(null);
  const [isReviewModalOpen, setIsReviewModalOpen] = useState(false);

  useEffect(() => {
    const selectedCompany = companiesData.find((c) => c.id.toString() === id);
    setCompany(selectedCompany);
  }, [id]);

  const handleAddReview = (newReview) => {
    const formattedDate = new Date(newReview.date).toLocaleDateString('en-GB', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    }).replace(/\//g, '-');

    const reviewToAdd = {
      name: newReview.name,
      date: formattedDate,
      review: newReview.description,
      userImage: newReview.image || 'https://via.placeholder.com/50',
      userRating: newReview.rating.toString()
    };

    setCompany(prevCompany => ({
      ...prevCompany,
      reviewsList: [...prevCompany.reviewsList, reviewToAdd],
      reviews: `${prevCompany.reviewsList.length + 1} Reviews`
    }));
  };

  if (!company) {
    return <div className="company-not-found">Company not found</div>;
  }

  return (
    <div className="company-review">
      <div className="company-header">
        <div className="company-info">
          <img src={company.image} alt={company.name} className="company-image" />
          <div>
            <h1>{company.name}</h1>
            <p>{company.address}</p>
            <div className="rating-reviews">
              <span className="rating">{company.rating}</span>
              <span className="stars">★★★★★</span>
              <span className="reviews">{company.reviews}</span>
            </div>
          </div>
        </div>
        <div className="add-review-section">
          <p className="founded">Founded on {company.founded}</p>
          <button 
            className="add-review-button" 
            onClick={() => setIsReviewModalOpen(true)}
          >
            + Add Review
          </button>
        </div>
      </div>

      <h2 className="results-found">Results Found: {company.reviewsList.length}</h2>
      
      <div className="reviews-container">
        {company.reviewsList.map((review, index) => (
          <div key={index} className="review">
            <div className="review-header">
              <img src={review.userImage} alt={review.name} className="user-image" />
              <div className="review-info">
                <h3>{review.name}</h3>
                <div className="review-meta">
                  <p className="date">{review.date}</p>
                  <div className="user-rating">
                    <span className="stars">★★★★★</span>
                    <span className="rating-value">{review.userRating}</span>
                  </div>
                </div>
              </div>
            </div>
            <p className="review-text">{review.review}</p>
          </div>
        ))}
      </div>

      {isReviewModalOpen && (
        <AddReviewModal 
          closeModal={() => setIsReviewModalOpen(false)} 
          onAddReview={handleAddReview}
        />
      )}
    </div>
  );
};

export default CompanyReview;