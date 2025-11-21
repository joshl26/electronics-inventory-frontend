// description: A card component to display customer reviews with author image, name, job title, star rating, review body, and date published.
// file: src/components/common/CustomerReviewCard.jsx

import React from "react";
import reviewStar from "svg/reviewstar.svg";
import { Image, Col, Row, Container } from "react-bootstrap";
import "./CustomerReviewCard.scss";

const CustomerReviewCard = ({ review }) => {
  return (
    <div className={"review_card_outer_container"}>
      <Container className={"review_card_inner_container"}>
        <Row>
          <div className={"spacer"}></div>
          <Col md={3}>
            <Image className={"image"} src={review.authorImage} />
          </Col>
          <Col md={9} className={"col_2"}>
            <div className={"spacer"}></div>
            <h4 className={"review_author"}>{review.author}</h4>
            <p className={"review_job_title"}>{review.jobTitle}</p>
          </Col>
        </Row>
        <div className={"spacer"}></div>
        <Image className={"review_star"} src={reviewStar} />
        <Image src={reviewStar} />
        <Image src={reviewStar} />
        <Image src={reviewStar} />
        <Image src={reviewStar} />
        <div className={"spacer"}></div>

        <p className={"review_body"}>{review.reviewBody}</p>

        <p className={"review_date"}>{review.datePublished}</p>
      </Container>
      <div className={"spacer"}></div>
    </div>
  );
};

export default CustomerReviewCard;
