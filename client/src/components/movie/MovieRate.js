import React, { useEffect, useState } from "react";
import { useMutation } from "@apollo/react-hooks";
import gql from "graphql-tag";
import { Form, Rate, Button } from "antd";

const MovieRate = ({ user, movie: { id, ratingCount, ratings } }) => {
  const [rated, setRated] = useState(0);

  useEffect(() => {
    const ratingIndex = ratings.findIndex(
      rate => rate.username === user.username
    );
    const rating = ratings[ratingIndex];
    if (user && rating) {
      setRated(rating.rating);
    } else setRated(0);
  }, [user, ratings]);

  const [rateMovie] = useMutation(RATE_MOVIE_MUTATION, {
    variables: { movieId: id, rating: rated }
  });

  return (
    <Form>
      <Form.Item>
        <Rate
          value={rated}
          onChange={event => setRated(event)}
          style={{ marginRight: 8 }}
        />
        {user && (
          <Button type="submit" onClick={rateMovie}>
            {ratings.find(r => r.username === user.username) ? "撤销" : "提交"}
          </Button>
        )}
      </Form.Item>
    </Form>
  );
};

const RATE_MOVIE_MUTATION = gql`
  mutation rateMovie($movieId: ID!, $rating: Int!) {
    rateMovie(movieId: $movieId, rating: $rating) {
      id
      ratings {
        id
        rating
        username
        createdAt
      }
      ratingOverall
      ratingCount
    }
  }
`;
export default MovieRate;
