import React, { useContext } from "react";
import { useQuery } from "@apollo/react-hooks";
import { Card, Tag, Skeleton, Divider } from "antd";
import { Link } from "react-router-dom";

import { AuthContext } from "../../context/auth";
import MovieForm from "../../components/movie/MovieForm";
import SearchMovieForm from "../../components/movie/SearchMovieForm";
import { FETCH_MOVIES_QUERY } from "../../utils/graphql";

import "../../css/w3.css";
import moviesImg from "../../assets/movies.jpg";
import Footer from "../../components/Footer";
import "../../css/Home.css";

const Movies = () => {
  const MAX_ITEMS = 18;
  const { user } = useContext(AuthContext);

  const {
    loading,
    data: { getMovies: movies }
  } = useQuery(FETCH_MOVIES_QUERY);

  return loading ? (
    <>
      <header
        className="w3-display-container w3-content w3-wide"
        style={{ maxWidth: "1500px" }}
        id="home"
      >
        <img
          className="w3-image"
          src={moviesImg}
          alt="Architecture"
          width="1500"
          height="800"
        />
        <div className="w3-display-middle w3-margin-top w3-center">
          <h1 className="w3-xxlarge w3-text-white">
            <span className="w3-padding w3-black w3-opacity-min">
              <b>Awesome</b>
            </span>{" "}
            <span className="w3-hide-small w3-text-light-grey">Douban</span>
            <div style={{ margin: "24px 0" }} />
            <SearchMovieForm />
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
          src={moviesImg}
          alt="Architecture"
          width="1500"
          height="800"
        />
        <div className="w3-display-middle w3-margin-top w3-center">
          <h1 className="w3-xxlarge w3-text-white">
            <span className="w3-padding w3-black w3-opacity-min">
              <b>Awesome</b>
            </span>{" "}
            <span className="w3-hide-small w3-text-light-grey">Douban</span>
            <div style={{ margin: "24px 0" }} />
            <SearchMovieForm />
          </h1>
        </div>
      </header>
      <br />
      <div className="page page-home">
        <div className="block block-hotshow">
          <div className="line-raw">
            <Divider>
              <h2 className="raw-title">热门影视</h2>
            </Divider>
          </div>
          <div className="cards-box clearfix">
            {[...movies]
              .sort((first, second) => second.commentCount - first.commentCount)
              .slice(0, MAX_ITEMS)
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
              })}
          </div>
          <div className="line-raw">
            <Divider>
              <h2 className="raw-title">高分影视</h2>
            </Divider>
          </div>
          <div className="cards-box clearfix">
            {[...movies]
              .sort((first, second) => second.ratingCount - first.ratingCount)
              .slice(0, MAX_ITEMS)
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
              })}
          </div>

          <div className="line-raw">
            <Divider>
              <h2 className="raw-title">最新影视</h2>
            </Divider>
          </div>
          <div className="cards-box clearfix">
            {movies.slice(0, MAX_ITEMS).map(movie => {
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
            })}
          </div>
          {user && user.username === "ndsf" && (
            <>
              <div className="line-raw">
                <Divider>
                  <h2 className="raw-title">添加影视</h2>
                </Divider>
              </div>
              <MovieForm />
            </>
          )}
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Movies;
