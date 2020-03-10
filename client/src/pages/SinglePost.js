import React, { useContext, useState, useRef } from 'react';
import gql from 'graphql-tag';
import moment from 'moment';
import { useQuery, useMutation } from '@apollo/react-hooks';

// Semantic UI
import {
  Grid,
  Image,
  Card,
  Button,
  Icon,
  Label,
  Form
} from 'semantic-ui-react';

// utils
import { AuthContext } from '../context/auth';
import LikeButton from '../components/LikeButton';
import DeleteButton from '../components/DeleteButton';

// Mutation
const FETCH_POST_QUERY = gql`
  query($postId: ID!) {
    getPost(postId: $postId) {
      id
      body
      username
      createdAt
      likeCount
      commentCount
      likes {
        username
      }
      comments {
        id
        username
        createdAt
        body
      }
    }
  }
`;

const SUBMIT_COMMENT_MUTATION = gql`
  mutation($postId: ID!, $body: String!) {
    createComment(postId: $postId, body: $body) {
      id
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

const SinglePost = props => {
  const postId = props.match.params.postId;
  const { user } = useContext(AuthContext);

  const commentInputRef = useRef(null);
  const [comment, setComment] = useState('');

  const res = useQuery(FETCH_POST_QUERY, {
    variables: {
      postId
    }
  });

  const [submitComment] = useMutation(SUBMIT_COMMENT_MUTATION, {
    update() {
      setComment('');
      commentInputRef.current.blur();
    },
    variables: {
      postId,
      body: comment
    }
  });

  const deletePostCb = () => props.history.push('/');
  let postMarkup;

  try {
    const {
      id,
      username,
      body,
      createdAt,
      comments,
      likes,
      likeCount,
      commentCount
    } = res.data.getPost;
    postMarkup = (
      <Grid>
        <Grid.Row>
          <Grid.Column width={2}>
            <Image
              src="https://react.semantic-ui.com/images/avatar/large/molly.png"
              size="small"
              float="right"
            />
          </Grid.Column>
          <Grid.Column width={10}>
            <Card fluid>
              <Card.Content>
                <Card.Header>{username}</Card.Header>
                <Card.Meta>{moment(createdAt).fromNow()}</Card.Meta>
                <Card.Description>{body}</Card.Description>
              </Card.Content>
              <hr />
              <Card.Content extra>
                <LikeButton
                  user={user}
                  post={{ id, likeCount, likes }}
                ></LikeButton>
                <Button
                  as="div"
                  labelPosition="right"
                  onClick={() => null}
                  basic
                >
                  <Button basic color="blue">
                    <Icon name="comments" />
                  </Button>
                  <Label basic color="blue" pointing="left">
                    {commentCount}
                  </Label>
                </Button>
                {user && user.username === username && (
                  <DeleteButton deletePostCb={deletePostCb} postId={id} />
                )}
              </Card.Content>
            </Card>
            {user && (
              <Card fluid>
                <Card.Content>
                  <p>Add a comment</p>
                  <Form>
                    <div className="ui action input fluid">
                      <input
                        type="text"
                        placeholder="comment..."
                        name="comment"
                        value={comment}
                        onChange={e => setComment(e.target.value)}
                        ref={commentInputRef}
                      />
                      <button
                        className="ui teal button"
                        disabled={comment.trim() === ''}
                        onClick={submitComment}
                      >
                        Submit
                      </button>
                    </div>
                  </Form>
                </Card.Content>
              </Card>
            )}
            {comments.map(cmt => (
              <Card fluid key={cmt.id}>
                <Card.Content>
                  {user && user.username === cmt.username && (
                    <DeleteButton postId={id} commentId={cmt.id} />
                  )}
                  <Card.Header>{username}</Card.Header>
                  <Card.Meta>{moment(cmt.createdAt).fromNow()}</Card.Meta>
                  <Card.Description>{cmt.body}</Card.Description>
                </Card.Content>
              </Card>
            ))}
          </Grid.Column>
        </Grid.Row>
      </Grid>
    );
  } catch (error) {
    postMarkup = <p>Loading...</p>;
  } finally {
    return postMarkup;
  }
};

export default SinglePost;
