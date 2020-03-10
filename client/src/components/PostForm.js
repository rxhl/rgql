import React from 'react';
import gql from 'graphql-tag';
import { useMutation } from '@apollo/react-hooks';

// Semantic UI
import { Form, Button } from 'semantic-ui-react';

// utils
import { useForm } from '../utils/hooks';
import { FETCH_POSTS_QUERY } from '../utils/graphql';

// Mutation
const CREATE_POST_MUTATION = gql`
  mutation createPost($body: String!) {
    createPost(body: $body) {
      id
      username
      body
      createdAt
      likeCount
      likes {
        id
        username
        createdAt
      }
      commentCount
      comments {
        id
        body
        username
        createdAt
      }
    }
  }
`;

const PostForm = () => {
  const { values, onChange, onSubmit } = useForm(createPostCb, { body: '' });

  const [createPost, { error }] = useMutation(CREATE_POST_MUTATION, {
    variables: values,
    update(proxy, result) {
      // Access cache
      const data = proxy.readQuery({
        query: FETCH_POSTS_QUERY
      });
      // New data = New post + Old posts
      data.getPosts = [result.data.createPost, ...data.getPosts];

      // Persist data
      proxy.writeQuery({
        query: FETCH_POSTS_QUERY,
        data
      });

      // Clean input
      values.body = '';
      // TODO: Add post to cache WITHOUT refresh
      window.location.reload();
    }
  });

  // Hoist createPost
  function createPostCb() {
    createPost();
  }
  return (
    <>
      <Form onSubmit={onSubmit}>
        <h2 style={{ color: '#aaa' }}>Create a new post</h2>
        <Form.Field>
          <Form.Input
            placeholder="New post..."
            name="body"
            onChange={onChange}
            value={values.body}
            error={error ? true : false}
          />
          <Button type="submit" color="teal">
            Submit
          </Button>
        </Form.Field>
      </Form>
      {error && (
        <div className="ui error message" style={{ marginBottom: 20 }}>
          <ul className="list">
            <li>{error.graphQLErrors[0].message}</li>
          </ul>
        </div>
      )}
    </>
  );
};

export default PostForm;
