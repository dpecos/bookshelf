import { Component } from 'react';
import React from 'react';
import { useParams } from 'react-router-dom';
import StarRatingComponent from 'react-star-rating-component';
import './rating.css';

interface IProps {
  rating: number;
}

export class Rating extends Component<IProps> {
  constructor(props: IProps) {
    super(props);
  }

  render() {
    return (
      <>
        <StarRatingComponent
          name="rating"
          value={this.props.rating || 0}
          editing={false}
        />
        <span>
          {(this.props.rating === 1 && 'Bad') ||
            (this.props.rating === 2 && 'Ok') ||
            (this.props.rating === 3 && 'Good') ||
            (this.props.rating === 4 && 'Great') ||
            (this.props.rating === 5 && 'Wow')}
        </span>
      </>
    );
  }
}

export default () => {
  const { rating } = useParams();
  return <Rating rating={rating} />;
};
