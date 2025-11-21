import React from "react";
import { Image } from "react-bootstrap";
import reviewStar from "svg/reviewstar.svg";
import "./CustomerReviewCard.scss";

const CustomerReviewCard = ({ review }) => {
  const stars = Array(5)
    .fill(0)
    .map((_, i) => (
      <img
        key={i}
        src={reviewStar}
        alt={i < review.rating ? "Filled star" : "Empty star"}
        className={`star ${i < review.rating ? "filled" : "empty"}`}
      />
    ));

  return (
    <article className="review-card" aria-label={`Review by ${review.author}`}>
      <div className="review-header">
        <Image
          src={review.authorImage}
          alt={`${review.author} photo`}
          roundedCircle
          className="author-image"
        />
        <div className="author-info">
          <h3 className="author-name">{review.author}</h3>
          <p className="author-job">{review.jobTitle}</p>
        </div>
      </div>
      <div
        className="review-rating"
        aria-label={`Rating: ${review.rating} out of 5`}
      >
        {stars}
      </div>
      <p className="review-body">{review.reviewBody}</p>
      <time className="review-date" dateTime={review.datePublished}>
        {review.datePublished}
      </time>
    </article>
  );
};

export default CustomerReviewCard;
