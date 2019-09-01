import React from "react";
import { Card, Tag } from "antd";
import { Link } from "react-router-dom";
import "../../css/Home.css";

const BookCard = ({ book: { id, body, author, ratingCount } }) => {
  return (
    <Card
      className="movie-card"
      hoverable
      cover={
        <Link to={`/books/${id}`}>
          <img
            alt=""
            className="card-img"
            src="https://p0.meituan.net/movie/005955214d5b3e50c910d7a511b0cb571445301.jpg@464w_644h_1e_1c"
          />
        </Link>
      }
    >
      <Tag className="img-tag tag-orange">{ratingCount}分</Tag>
      <Card.Meta title={body} description={author} />
    </Card>
  );
};

export default BookCard;
