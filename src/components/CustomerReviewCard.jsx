import React from 'react';
import PropTypes from 'prop-types';
import { Image, Col, Row, Container } from 'react-bootstrap';
import classes from './CustomerReviewCard.module.css';
import reviewStar from '../svg/reviewstar.svg';

function CustomerReviewCard({ review = {} }) {
  const {
    author = '',
    authorImage = '',
    jobTitle = '',
    reviewBody = '',
    datePublished = '',
  } = review;

  return (
    <div className={classes.review_card_outer_container}>
      <Container className={classes.review_card_inner_container}>
        <Row>
          <div className={classes.spacer} />
          <Col md={3}>
            <Image className={classes.image} src={authorImage} alt={`${author} profile`} />
          </Col>
          <Col md={9} className={classes.col_2}>
            <div className={classes.spacer} />
            <h4 className={classes.review_author}>{author}</h4>
            <p className={classes.review_job_title}>{jobTitle}</p>
          </Col>
        </Row>
        <div className={classes.spacer} />
        <div>
          <Image className={classes.review_star} src={reviewStar} alt="star" />
          <Image src={reviewStar} alt="star" />
          <Image src={reviewStar} alt="star" />
          <Image src={reviewStar} alt="star" />
          <Image src={reviewStar} alt="star" />
        </div>
        <div className={classes.spacer} />

        <p className={classes.review_body}>{reviewBody}</p>

        <p className={classes.review_date}>{datePublished}</p>
      </Container>
      <div className={classes.spacer} />
    </div>
  );
}

CustomerReviewCard.propTypes = {
  review: PropTypes.shape({
    author: PropTypes.string,
    authorImage: PropTypes.string,
    jobTitle: PropTypes.string,
    reviewBody: PropTypes.string,
    datePublished: PropTypes.string,
  }),
};

CustomerReviewCard.defaultProps = {
  review: {
    author: '',
    authorImage: '',
    jobTitle: '',
    reviewBody: '',
    datePublished: '',
  },
};

export default CustomerReviewCard;
