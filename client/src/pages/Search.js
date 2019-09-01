import React from "react";
import { useQuery } from "@apollo/react-hooks";
import { Card, Tag, Spin, List, Avatar, Divider } from "antd";
import { Link } from "react-router-dom";
import moment from "moment";
import SearchForm from "../components/SearchForm";
import {
  FETCH_BOOKS_BY_BODY_QUERY,
  FETCH_MOVIES_BY_BODY_QUERY,
  FETCH_GROUPS_BY_BODY_QUERY
} from "../utils/graphql";

import Footer from "../components/Footer";
import "../css/Home.css";
const { Meta } = Card;
const Books = props => {
  const keyword = props.match.params.keyword;

  const {
    loading: loadingBooks,
    data: { getBooksByBody: books }
  } = useQuery(FETCH_BOOKS_BY_BODY_QUERY, {
    variables: { keyword: keyword }
  });

  const {
    loading: loadingMovies,
    data: { getMoviesByBody: movies }
  } = useQuery(FETCH_MOVIES_BY_BODY_QUERY, {
    variables: { keyword: keyword }
  });

  const {
    loading: loadingGroups,
    data: { getGroupsByBody: groups }
  } = useQuery(FETCH_GROUPS_BY_BODY_QUERY, {
    variables: { keyword: keyword }
  });

  return (
    <div>
      <div className="page page-home">
        <div className="block block-hotshow">
          <div style={{ margin: "24px 0" }} />
          <SearchForm />
          <div className="line-raw">
            <Divider>
              <h2 className="raw-title">热门书籍</h2>
            </Divider>
          </div>

          <div className="cards-box clearfix">
            {loadingBooks ? (
              <Spin />
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
            {loadingBooks ? (
              <Spin />
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
            {loadingBooks ? (
              <Spin />
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

          <div className="line-raw">
            <Divider>
              <h2 className="raw-title">热门影视</h2>
            </Divider>
          </div>
          <div className="cards-box clearfix">
            {loadingMovies ? (
              <h1>Loading movies...</h1>
            ) : (
              [...movies]
                .sort(
                  (first, second) => second.commentCount - first.commentCount
                )
                .map(movie => {
                  return (
                    <div className="card-container" key={movie.id}>
                      <Card
                        className="movie-card"
                        hoverable
                        cover={
                          <Link to={`/movies/${movie.id}`}>
                            <img src={movie.avatar} alt="" />
                          </Link>
                        }
                      >
                        <Tag className="img-tag tag-orange">
                          {movie.ratingCount}
                        </Tag>
                        <Card.Meta
                          title={movie.body}
                          description={movie.starring.join("/")}
                        />
                      </Card>
                    </div>
                  );
                })
            )}
          </div>
          <div className="line-raw">
            <Divider>
              <h2 className="raw-title">高分影视</h2>
            </Divider>
          </div>
          <div className="cards-box clearfix">
            {loadingMovies ? (
              <h1>Loading movies...</h1>
            ) : (
              [...movies]
                .sort((first, second) => second.ratingCount - first.ratingCount)
                .map(movie => {
                  return (
                    <div className="card-container" key={movie.id}>
                      <Card
                        className="movie-card"
                        hoverable
                        cover={
                          <Link to={`/movies/${movie.id}`}>
                            <img src={movie.avatar} alt="" />
                          </Link>
                        }
                      >
                        <Tag className="img-tag tag-orange">
                          {movie.ratingCount}
                        </Tag>
                        <Card.Meta
                          title={movie.body}
                          description={movie.starring.join("/")}
                        />
                      </Card>
                    </div>
                  );
                })
            )}
          </div>

          <div className="line-raw">
            <Divider>
              <h2 className="raw-title">最新影视</h2>
            </Divider>
          </div>
          <div className="cards-box clearfix">
            {loadingMovies ? (
              <h1>Loading movies...</h1>
            ) : (
              movies.map(movie => {
                return (
                  <div className="card-container" key={movie.id}>
                    <Card
                      className="movie-card"
                      hoverable
                      cover={
                        <Link to={`/movies/${movie.id}`}>
                          <img src={movie.avatar} alt="" />
                        </Link>
                      }
                    >
                      <Tag className="img-tag tag-orange">
                        {movie.ratingCount}
                      </Tag>
                      <Card.Meta
                        title={movie.body}
                        description={movie.starring.join("/")}
                      />
                    </Card>
                  </div>
                );
              })
            )}
          </div>

          {loadingGroups ? (
            <h1>Loading groups...</h1>
          ) : (
            <>
              <div className="line-raw">
                <Divider>
                  <h2 className="raw-title">最新小组</h2>
                </Divider>
              </div>
              <List
                grid={{
                  gutter: 16,
                  column: 4
                }}
                dataSource={groups}
                renderItem={item => (
                  <List.Item>
                    <Card>
                      <Meta
                        avatar={<Avatar src={item.avatar} />}
                        title={
                          <Link to={`/groups/${item.id}`}>{item.body}</Link>
                        }
                        description={
                          <p>
                            {item.username} 创建于{" "}
                            {moment(item.createdAt).fromNow()}
                          </p>
                        }
                      />
                    </Card>
                  </List.Item>
                )}
              />
              <div className="line-raw">
                <Divider>
                  <h2 className="raw-title">最热小组</h2>
                </Divider>
              </div>
              <List
                grid={{
                  gutter: 16,
                  column: 4
                }}
                dataSource={[...groups].sort(
                  (first, second) => second.likeCount - first.likeCount
                )}
                renderItem={item => (
                  <List.Item>
                    <Card>
                      <Meta
                        avatar={<Avatar src={item.avatar} />}
                        title={
                          <Link to={`/groups/${item.id}`}>{item.body}</Link>
                        }
                        description={
                          <p>
                            {item.username} 创建于{" "}
                            {moment(item.createdAt).fromNow()}
                          </p>
                        }
                      />
                    </Card>
                  </List.Item>
                )}
              />
            </>
          )}
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Books;
