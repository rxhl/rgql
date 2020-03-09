import React, { useContext } from 'react';
import { useQuery } from '@apollo/react-hooks';
import gql from 'graphql-tag';

// Semantic UI
import { Grid } from 'semantic-ui-react';

// utils
import PostCard from '../components/PostCard';
import PostForm from '../components/PostForm';
import { AuthContext } from '../context/auth';
import { FETCH_POSTS_QUERY } from '../utils/graphql';

const Home = () => {
  const { user } = useContext(AuthContext);
  let posts = [];
  const { loading, data } = useQuery(FETCH_POSTS_QUERY);
  if (data) {
    posts = data.getPosts;
  }

  return (
    <Grid columns={3}>
      <Grid.Row className="page-title">
        <h1>Recent Posts</h1>
        {!user && (
          <h3 style={{ color: '#aaa' }}>Login/Register to create posts.</h3>
        )}
      </Grid.Row>
      <Grid.Row>
        {user && (
          <Grid.Column>
            <PostForm />
          </Grid.Column>
        )}
        {loading ? (
          <h3>Loading...</h3>
        ) : (
          posts &&
          posts.map(post => (
            <Grid.Column key={post.id} style={{ marginBottom: '30px' }}>
              <PostCard post={post} />
            </Grid.Column>
          ))
        )}
      </Grid.Row>
    </Grid>
  );
};

export default Home;
