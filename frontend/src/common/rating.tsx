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
    let text = '';
    let color = '';

    switch (this.props.rating) {
      case 1: {
        text = 'Bad';
        color = 'darkred';
        break;
      }
      case 2: {
        text = 'Ok';
        color = 'darkorange';
        break;
      }
      case 3: {
        text = 'Good';
        color = '#999C63';
        break;
      }
      case 4: {
        text = 'Great';
        color = 'green';
        break;
      }
      case 5: {
        text = 'Wow';
        color = 'blue';
        break;
      }
    }

    return (
      <>
        <StarRatingComponent
          name="rating"
          value={this.props.rating || 0}
          editing={false}
        />
        <span style={{ color: color, fontWeight: 'bold' }}>{text}</span>
      </>
    );
  }
}

export default () => {
  const { rating } = useParams();
  return <Rating rating={rating} />;
};
