const { UserInputError } = require('apollo-server');

// utils
const Post = require('../../models/Post');
const verifyToken = require('../../util/verifyToken');

module.exports = {
  Mutation: {
    likePost: async (_, { postId }, context) => {
      const { username } = verifyToken(context);

      const post = await Post.findById(postId);
      if (post) {
        if (post.likes.find(like => like.username === username)) {
          // Post already liked, unlike it
          post.likes = post.likes.filter(like => like.username !== username);
        } else {
          // Like the post
          post.likes.push({
            username,
            createdAt: new Date().toISOString()
          });
        }
        await post.save();
        return post;
      } else throw new UserInputError('Post not found!');
    }
  }
};
