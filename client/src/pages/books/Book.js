import React, { useContext, useRef, useState } from "react";
import gql from "graphql-tag";
import { Link } from "react-router-dom";
import { useQuery, useMutation } from "@apollo/react-hooks";
import BookRate from "../../components/book/BookRate";
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
import BookDeleteButton from "../../components/book/BookDeleteButton";
import BookDeleteCommentButton from "../../components/book/BookDeleteCommentButton";
import "../../css/Detail.css";

const { TextArea } = Input;

const Book = props => {
  const bookId = props.match.params.bookId;
  const { user } = useContext(AuthContext);
  const titleInputRef = useRef(null);
  const commentInputRef = useRef(null);
  const [title, setTitle] = useState("");
  const [comment, setComment] = useState("");

  const {
    data: { getBook }
  } = useQuery(FETCH_BOOK_QUERY, {
    variables: {
      bookId
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
      bookId: bookId,
      title: title,
      body: comment
    }
  });

  const deleteBookCallback = () => {
    props.history.push("/books");
  };

  let bookMarkup;

  if (!getBook) {
    bookMarkup = <Skeleton />;
  } else {
    const {
      id,
      body,
      username,
      author,
      bio,
      avatar,
      comments,
      ratings,
      ratingCount,
      commentCount
    } = getBook;

    bookMarkup = (
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
                  <label>作者：</label>
                  {author.map(a => (
                    <span>{a}</span>
                  ))}
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
                    <BookDeleteButton
                      bookId={id}
                      callback={deleteBookCallback}
                    />
                  )}
                </div>
              </div>

              <div className={"drawer-in"}>
                <div className="block profile-reviews">
                  {user && (
                    <>
                      <h2 className="raw-title">添加你的评分</h2>
                      <BookRate
                        user={user}
                        book={{ id, ratingCount, ratings }}
                      />
                      <h2 className="raw-title">添加你的书评</h2>
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
                                  <BookDeleteCommentButton
                                    bookId={id}
                                    commentId={comment.id}
                                  />
                                ]
                              : []
                          }
                          className="cutsom-ant-comment"
                          key={comment.id}
                          author={
                            <>
                              <span>{username}</span>
                            </>
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

  return bookMarkup;
};

const SUBMIT_COMMENT_MUTATION = gql`
  mutation($bookId: ID!, $title: String!, $body: String!) {
    createBookComment(bookId: $bookId, title: $title, body: $body) {
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

const FETCH_BOOK_QUERY = gql`
  query getBook($bookId: ID!) {
    getBook(bookId: $bookId) {
      id
      body
      createdAt
      username
      author
      pub
      yearOfPub
      pages
      price
      ISBN
      bio
      avatar
      ratingCount
      ratings {
        id
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

export default Book;
