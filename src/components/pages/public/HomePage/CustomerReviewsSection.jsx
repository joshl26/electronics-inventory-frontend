import React from "react";
import { Slide } from "react-slideshow-image";
import CustomerReviewCard from "./CustomerReviewCard";
import "./CustomerReviewsSection.scss";

const reviews = [
  {
    id: 1,
    author: "Fahad Pace",
    jobTitle: "Electrical Engineer at Microverse",
    authorImage:
      "https://res.cloudinary.com/dv6keahg3/image/upload/v1681826980/ElectronicsInventory/user_review_images/review_1_h0cruy.png",
    datePublished: "April 24, 2023",
    reviewBody:
      "Electronics Inventory has allowed our business to save 35% time in searching for unused inventory.",
    rating: 4,
  },
  {
    id: 2,
    author: "Safwan Higgins",
    jobTitle: "Purchasing Manager at TrendLogic",
    authorImage:
      "https://res.cloudinary.com/dv6keahg3/image/upload/v1681826980/ElectronicsInventory/user_review_images/review_2_vd88wm.png",
    datePublished: "December 2, 2022",
    reviewBody:
      "Maintaining JIT inventory levels has been a challenge. Using Ei we saw a cost reduction of $25,000 across our worldwide locations.",
    rating: 5,
  },
  {
    id: 3,
    author: "Marshall Harper",
    jobTitle: "Senior Electrical Engineer",
    authorImage:
      "https://res.cloudinary.com/dv6keahg3/image/upload/v1681826980/ElectronicsInventory/user_review_images/review_6_mvavra.png",
    datePublished: "Jan 10, 2023",
    reviewBody:
      "An excellent app that simplifies inventory management - a must-have for industry professionals!",
    rating: 4,
  },
  // Add more reviews as needed
];

const responsiveSettings = [
  {
    breakpoint: 1500,
    settings: {
      slidesToShow: 3,
      slidesToScroll: 1,
    },
  },
  {
    breakpoint: 1100,
    settings: {
      slidesToShow: 2,
      slidesToScroll: 1,
    },
  },
  {
    breakpoint: 600,
    settings: {
      slidesToShow: 1,
      slidesToScroll: 1,
    },
  },
];

const CustomerReviewsSection = () => {
  return (
    <section className="customer-reviews-section">
      <h2 className="section-title">What Our Customers Say</h2>
      <p className="section-subtitle">
        Real feedback from professionals using Electronics Inventory.
      </p>
      <Slide
        autoplay
        indicators
        arrows
        responsive={responsiveSettings}
        easing="ease"
        duration={5000}
        transitionDuration={500}
      >
        {reviews.map((review) => (
          <div key={review.id} className="slide-item">
            <CustomerReviewCard review={review} />
          </div>
        ))}
      </Slide>
    </section>
  );
};

export default CustomerReviewsSection;
