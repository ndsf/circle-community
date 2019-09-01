import React, { useContext } from "react";
import { useQuery } from "@apollo/react-hooks";
import { Grid, Transition } from "semantic-ui-react";

import { AuthContext } from "../context/auth";
import PostCard from "../components/PostCard";
import PostForm from "../components/PostForm";
import SearchPostForm from "../components/SearchPostForm";
import { FETCH_POSTS_BY_BODY_QUERY } from "../utils/graphql";

const SearchPost = props => {
  const keyword = props.match.params.keyword;
  const { user } = useContext(AuthContext);

  const {
    loading,
    data: { getPostsByBody: posts }
  } = useQuery(FETCH_POSTS_BY_BODY_QUERY, {
    variables: { keyword: keyword }
  });

  return (
    <Grid columns={3}>
      <Grid.Row className="page-title">
        <h1>Posts contain {keyword}</h1>
      </Grid.Row>
      <Grid.Row>
        <Grid.Column>
          <SearchPostForm />
        </Grid.Column>

        {user && (
          <Grid.Column>
            <PostForm />
          </Grid.Column>
        )}

        {loading ? (
          <h1>Loading posts...</h1>
        ) : (
          <Transition.Group>
            {posts &&
              posts.map(post => (
                <Grid.Column key={post.id} style={{ marginBottom: "20px" }}>
                  <PostCard post={post} />
                </Grid.Column>
              ))}
          </Transition.Group>
        )}
      </Grid.Row>
    </Grid>
  );
};

export default SearchPost;
