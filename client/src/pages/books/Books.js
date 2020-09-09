import React, { useContext } from "react";
import { useQuery } from "@apollo/react-hooks";
import { Card, Tag, Skeleton, Divider } from "antd";
import { Link } from "react-router-dom";

import { AuthContext } from "../../context/auth";
import BookForm from "../../components/book/BookForm";
import SearchBookForm from "../../components/book/SearchBookForm";
import { FETCH_BOOKS_QUERY } from "../../utils/graphql";

import "../../css/w3.css";
import booksImg from "../../assets/books.jpg";

import Footer from "../../components/Footer";
import "../../css/Home.css";

const Books = () => {
  const MAX_ITEMS = 18;
  const { user } = useContext(AuthContext);

  const {
    loading,
    data: { getBooks: books }
  } = useQuery(FETCH_BOOKS_QUERY);

  return loading ? (
    <>
      <header
        className="w3-display-container w3-content w3-wide"
        style={{ maxWidth: "1500px" }}
        id="home"
      >
        <img
          className="w3-image"
          src={booksImg}
          alt="Architecture"
          width="1500"
          height="800"
        />
        <div className="w3-display-middle w3-margin-top w3-center">
          <h1 className="w3-xxlarge w3-text-white">
            <span className="w3-padding w3-black w3-opacity-min">
              <b>Circle</b>
            </span>{" "}
            <span className="w3-hide-small w3-text-light-grey">Community</span>
            <div style={{ margin: "24px 0" }} />
            <SearchBookForm />
          </h1>
        </div>
      </header>
      <Skeleton />
    </>
  ) : (
    <div>
      <header
        className="w3-display-container w3-content w3-wide"
        style={{ maxWidth: "1500px" }}
        id="home"
      >
        <img
          className="w3-image"
          src={booksImg}
          alt="Architecture"
          width="1500"
          height="800"
        />
        <div className="w3-display-middle w3-margin-top w3-center">
          <h1 className="w3-xxlarge w3-text-white">
            <span className="w3-padding w3-black w3-opacity-min">
              <b>Circle</b>
            </span>{" "}
            <span className="w3-hide-small w3-text-light-grey">Community</span>
            <div style={{ margin: "24px 0" }} />
            <SearchBookForm />
          </h1>
        </div>
      </header>
      <br />
      <div className="page page-home">
        <div className="block block-hotshow">
          <div className="line-raw">
            <Divider>
              <h2 className="raw-title">热门书籍</h2>
            </Divider>
          </div>
          <div className="cards-box clearfix">
            {[...books]
              .sort((first, second) => second.commentCount - first.commentCount)
              .slice(0, MAX_ITEMS)
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
              })}
          </div>

          <div className="line-raw">
            <Divider>
              <h2 className="raw-title">高分书籍</h2>
            </Divider>
          </div>
          <div className="cards-box clearfix">
            {[...books]
              .sort((first, second) => second.ratingCount - first.ratingCount)
              .slice(0, MAX_ITEMS)
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
              })}
          </div>

          <div className="line-raw">
            <Divider>
              <h2 className="raw-title">最新书籍</h2>
            </Divider>
          </div>
          <div className="cards-box clearfix">
            {books.slice(0, MAX_ITEMS).map(book => {
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
                    <Tag className="img-tag tag-orange">{book.ratingCount}</Tag>
                    <Card.Meta
                      title={book.body}
                      description={book.author.join("/")}
                    />
                  </Card>
                </div>
              );
            })}
          </div>
          {user && user.username === "ndsf" && (
            <>
              <div className="line-raw">
                <Divider>
                  <h2 className="raw-title">添加书籍</h2>
                </Divider>
              </div>
              <BookForm />
            </>
          )}
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Books;
