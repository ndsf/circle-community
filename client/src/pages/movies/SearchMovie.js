import React from "react";
import { useQuery } from "@apollo/react-hooks";
import { Card, Tag, Skeleton, Divider } from "antd";
import { Link } from "react-router-dom";

import SearchMovieForm from "../../components/movie/SearchMovieForm";
import { FETCH_MOVIES_BY_BODY_QUERY } from "../../utils/graphql";

import Footer from "../../components/Footer";
import "../../css/Home.css";

const Movies = props => {
  const keyword = props.match.params.keyword;

  const {
    loading,
    data: { getMoviesByBody: movies }
  } = useQuery(FETCH_MOVIES_BY_BODY_QUERY, {
    variables: { keyword: keyword }
  });

  return (
    <div>
      <div className="page page-home">
        <div className="block block-hotshow">
          <div style={{ margin: "24px 0" }} />
          <SearchMovieForm />
          <div className="line-raw">
            <Divider>
              <h2 className="raw-title">热门影视</h2>
            </Divider>
          </div>
          <div className="cards-box clearfix">
            {loading ? (
              <Skeleton />
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
            {loading ? (
              <Skeleton />
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
            {loading ? (
              <Skeleton />
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
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Movies;
