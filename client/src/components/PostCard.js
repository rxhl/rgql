import React, { useContext } from 'react';
import moment from 'moment';
import { Link } from 'react-router-dom';

// Semantic UI
import { Card, Icon, Label, Image, Button } from 'semantic-ui-react';

// utils
import { AuthContext } from '../context/auth';
import LikeButton from './LikeButton';

const PostCard = props => {
  const { user } = useContext(AuthContext);
  const { id, body, createdAt, username, commentCount } = props.post;

  const commentOnPost = () => null;

  return (
    <Card fluid>
      <Card.Content>
        <Image
          floated="right"
          size="mini"
          src="https://react.semantic-ui.com/images/avatar/large/molly.png"
        />
        <Card.Header>{username}</Card.Header>
        <Card.Meta as={Link} to={`/posts/${id}`}>
          {moment(createdAt).fromNow()}
        </Card.Meta>
        <Card.Description>{body}</Card.Description>
      </Card.Content>
      <Card.Content extra>
        <LikeButton user={user} post={props.post} />
        <Button
          as={Link}
          to={`/posts/${id}`}
          labelPosition="right"
          onClick={commentOnPost}
        >
          <Button color="blue" basic>
            <Icon name="comments" />
          </Button>
          <Label basic color="blue" pointing="left">
            {commentCount}
          </Label>
        </Button>
        {user && user.username === username && (
          <Button
            basic
            as="div"
            color="red"
            floated="right"
            onClick={() => null}
          >
            <Icon name="trash" style={{ margin: 0 }} />
          </Button>
        )}
      </Card.Content>
    </Card>
  );
};

export default PostCard;
