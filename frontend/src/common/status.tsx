import React, { Component } from 'react';
import { useParams } from 'react-router-dom';
import { BookStatus } from '../books/book_status';
import './rating.css';

interface IProps {
  status: BookStatus;
}

export class Status extends Component<IProps> {
  constructor(props: IProps) {
    super(props);
  }

  render() {
    let text =
      this.props.status?.charAt(0).toUpperCase() +
      this.props.status?.toLowerCase().slice(1) || '';
    let color = '';

    switch (this.props.status) {
      case 'FINISHED': {
        color = 'green';
        break;
      }
      case 'READING': {
        color = 'blue';
        break;
      }
      case 'WISHLIST': {
        color = '#999C63';
        break;
      }
      case 'ABANDONED': {
        color = 'darkred';
        break;
      }
    }

    return (
      <>
        <span style={{ color: color, fontWeight: 'bold' }}>{text}</span>
      </>
    );
  }
}

export default () => {
  const { status } = useParams();
  return <Status status={status} />;
};
