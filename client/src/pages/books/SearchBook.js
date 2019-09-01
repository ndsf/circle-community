import React from "react";
import { useQuery } from "@apollo/react-hooks";
import { Card, Tag, Skeleton, Divider } from "antd";
import { Link } from "react-router-dom";

import SearchBookForm from "../../components/book/SearchBookForm";
import { FETCH_BOOKS_BY_BODY_QUERY } from "../../utils/graphql";

import Footer from "../../components/Footer";
import "../../css/Home.css";

const Books = props => {
  const keyword = props.match.params.keyword;

  const {
    loading,
    data: { getBooksByBody: books }
  } = useQuery(FETCH_BOOKS_BY_BODY_QUERY, {
    variables: { keyword: keyword }
  });

  return (
    <div>
      <div className="page page-home">
        <div className="block block-hotshow">
          <div style={{ margin: "24px 0" }} />
          <SearchBookForm />
          <div className="line-raw">
            <Divider>
              <h2 className="raw-title">热门书籍</h2>
            </Divider>
          </div>

          <div className="cards-box clearfix">
            {loading ? (
              <Skeleton />
            ) : (
              [...books]
                .sort(
                  (first, second) => second.commentCount - first.commentCount
                )
                .map(book => {
                  return (
                    <div className="card-container" key={book.id}>
                      <Card
                        className="movie-card"
                        hoverable
                        cover={
                          <Link to={`/books/${book.id}`}>
                            <img src={book.avatar} alt="" />
                          </Link>
                        }
                      >
                        <Tag className="img-tag tag-orange">
                          {book.ratingCount}
                        </Tag>
                        <Card.Meta
                          title={book.body}
                          description={book.author.join("/")}
                        />
                      </Card>
                    </div>
                  );
                })
            )}
          </div>

          <div className="line-raw">
            <Divider>
              <h2 className="raw-title">高分书籍</h2>
            </Divider>
          </div>

          <div className="cards-box clearfix">
            {loading ? (
              <Skeleton />
            ) : (
              [...books]
                .sort((first, second) => second.ratingCount - first.ratingCount)
                .map(book => {
                  return (
                    <div className="card-container" key={book.id}>
                      <Card
                        className="movie-card"
                        hoverable
                        cover={
                          <Link to={`/books/${book.id}`}>
                            <img src={book.avatar} alt="" />
                          </Link>
                        }
                      >
                        <Tag className="img-tag tag-orange">
                          {book.ratingCount}
                        </Tag>
                        <Card.Meta
                          title={book.body}
                          description={book.author.join("/")}
                        />
                      </Card>
                    </div>
                  );
                })
            )}
          </div>

          <div className="line-raw">
            <Divider>
              <h2 className="raw-title">最新书籍</h2>
            </Divider>
          </div>
          <div style={{ margin: "24px 0" }} />
          <div className="cards-box clearfix">
            {loading ? (
              <Skeleton />
            ) : (
              books.map(book => {
                return (
                  <div className="card-container" key={book.id}>
                    <Card
                      className="movie-card"
                      hoverable
                      cover={
                        <Link to={`/books/${book.id}`}>
                          <img src={book.avatar} alt="" />
                        </Link>
                      }
                    >
                      <Tag className="img-tag tag-orange">
                        {book.ratingCount}
                      </Tag>
                      <Card.Meta
                        title={book.body}
                        description={book.author.join("/")}
                      />
                    </Card>
                  </div>
                );
              })
            )}
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Books;
