import React, { useContext, useRef, useState } from "react";
import gql from "graphql-tag";
import { useQuery, useMutation } from "@apollo/react-hooks";
import { Link } from "react-router-dom";
import MovieRate from "../../components/movie/MovieRate";
import {
  Form,
  Comment,
  Avatar,
  Tooltip,
  Typography,
  Input,
  Button,
  Skeleton
} from "antd";
import moment from "moment";
//import LikeButton from "../../components/LikeButton";
import { AuthContext } from "../../context/auth";
import MovieDeleteButton from "../../components/movie/MovieDeleteButton";
import MovieDeleteCommentButton from "../../components/movie/MovieDeleteCommentButton";
import "../../css/Detail.css";

const { TextArea } = Input;

const Movie = props => {
  const movieId = props.match.params.movieId;
  const { user } = useContext(AuthContext);
  const titleInputRef = useRef(null);
  const commentInputRef = useRef(null);
  const [title, setTitle] = useState("");
  const [comment, setComment] = useState("");

  const {
    data: { getMovie }
  } = useQuery(FETCH_MOVIE_QUERY, {
    variables: {
      movieId
    }
  });

  const [submitComment] = useMutation(SUBMIT_COMMENT_MUTATION, {
    update: () => {
      setTitle("");
      setComment("");
      titleInputRef.current.blur();
      commentInputRef.current.blur();
    },
    variables: {
      movieId: movieId,
      title: title,
      body: comment
    }
  });

  const deleteMovieCallback = () => {
    props.history.push("/movies");
  };

  let movieMarkup;

  if (!getMovie) {
    movieMarkup = <Skeleton />;
  } else {
    const {
      id,
      body,
      username,
      director,
      screenwriter,
      starring,
      type,
      region,
      length,
      alias,
      bio,
      avatar,
      comments,
      ratings,
      ratingCount,
      commentCount
    } = getMovie;

    movieMarkup = (
      <>
        <div className="page page-detail">
          <div className="poster-box">
            <div className="profile">
              <div className="profile-rate">
                <div className="rate">
                  <span className="units">{ratingCount}</span>
                  <p style={{ color: "white" }}>{ratings.length} 评价者</p>
                </div>

                <h2 className="title">{body}</h2>
              </div>
              <div className="block profile-img">
                <img src={avatar} alt="" />
              </div>
              <div className="block profile-info">
                <h2 className="raw-title">{body}</h2>
                <div className="directors">
                  <label>导演：</label>
                  {director.map(d => {
                    return <>{d} </>;
                  })}
                  <br />
                  <label>编剧：</label>
                  {screenwriter.map(d => {
                    return <>{d} </>;
                  })}
                  <br />
                  <label>主演：</label>
                  {starring.map(d => {
                    return <>{d} </>;
                  })}
                  <br />
                  <label>类型：</label>
                  {type.map(d => {
                    return <>{d} </>;
                  })}
                  <br />
                  <label>地区：</label>
                  {region}
                  <br />
                  <label>片长：</label>
                  {length}
                  <br />
                  <label>别名：</label>
                  {alias}
                </div>
                <div className="video_summary">
                  <Typography.Paragraph
                    className="summary"
                    ellipsis={{
                      rows: 3,
                      expandable: true
                    }}
                  >
                    {bio}
                  </Typography.Paragraph>
                  {user && user.username === username && (
                    <MovieDeleteButton
                      movieId={id}
                      callback={deleteMovieCallback}
                    />
                  )}
                </div>
              </div>

              <div className={"drawer-in"}>
                <div className="block profile-reviews">
                  {user && (
                    <>
                      <h2 className="raw-title">添加你的评分</h2>
                      <MovieRate
                        user={user}
                        movie={{ id, ratingCount, ratings }}
                      />
                      <h2 className="raw-title">添加你的影评</h2>
                      <Form>
                        <Form.Item>
                          <Input
                            type="text"
                            placeholder="标题"
                            name="title"
                            value={title}
                            onChange={event => setTitle(event.target.value)}
                            ref={titleInputRef}
                          />
                        </Form.Item>
                        <Form.Item>
                          <TextArea
                            autosize={{ minRows: 4, maxRows: 100 }}
                            placeholder="正文（不少于25字）"
                            name="comment"
                            value={comment}
                            onChange={event => setComment(event.target.value)}
                            ref={commentInputRef}
                          />
                        </Form.Item>
                        <Form.Item>
                          <Button
                            disabled={comment.trim().length < 25}
                            onClick={submitComment}
                          >
                            提交
                          </Button>
                        </Form.Item>
                      </Form>
                    </>
                  )}
                  <h2 className="raw-title">书评（{commentCount}）</h2>
                  {comments.map(comment => {
                    let { username, title, body, createdAt } = comment;

                    return (
                      <>
                        <Comment
                          actions={
                            user && user.username === comment.username
                              ? [
                                  <MovieDeleteCommentButton
                                    movieId={id}
                                    commentId={comment.id}
                                  />
                                ]
                              : []
                          }
                          className="cutsom-ant-comment"
                          key={comment.id}
                          author={
                            <Link to={`/users/${username}`}>{username}</Link>
                          }
                          avatar={
                            <Link to={`/users/${username}`}>
                              <Avatar
                                style={{
                                  color: "#f56a00",
                                  backgroundColor: "#fde3cf"
                                }}
                              >
                                {username}
                              </Avatar>
                            </Link>
                          }
                          content={
                            <>
                              <strong>{title}</strong>
                              <p>{body}</p>
                            </>
                          }
                          datetime={
                            <Tooltip
                              title={moment(createdAt).format(
                                "YYYY-MM-DD HH:mm:ss"
                              )}
                            >
                              <span>{moment(createdAt).fromNow()}</span>
                            </Tooltip>
                          }
                        />
                      </>
                    );
                  })}
                </div>
              </div>
            </div>
          </div>
        </div>
      </>
    );
  }

  return movieMarkup;
};

const SUBMIT_COMMENT_MUTATION = gql`
  mutation($movieId: ID!, $title: String!, $body: String!) {
    createMovieComment(movieId: $movieId, title: $title, body: $body) {
      id
      comments {
        id
        title
        body
        createdAt
        username
      }
      commentCount
    }
  }
`;

const FETCH_MOVIE_QUERY = gql`
  query getMovie($movieId: ID!) {
    getMovie(movieId: $movieId) {
      id
      body
      createdAt
      username
      director
      screenwriter
      starring
      type
      region
      language
      releaseDate
      length
      alias
      bio
      avatar
      ratingCount
      ratings {
        rating
        username
      }
      commentCount
      comments {
        id
        username
        createdAt
        title
        body
      }
    }
  }
`;

export default Movie;
