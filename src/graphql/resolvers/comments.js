const { UserInputError } = require('apollo-server');
const { AuthenticationError } = require('apollo-server');

// utils
const Post = require('../../models/Post');
const verifyToken = require('../../util/verifyToken');

module.exports = {
  Mutation: {
    createComment: async (_, { postId, body }, context) => {
      const { username } = verifyToken(context);
      if (body.trim() === '') {
        // No empty comments
        throw new UserInputError('Empty comment', {
          errors: {
            body: 'Comment body must not be empty!'
          }
        });
      }
      const post = await Post.findById(postId);
      if (post) {
        post.comments.unshift({
          body,
          username,
          createdAt: new Date().toISOString()
        });
        await post.save();
        return post;
      } else throw new UserInputError('Post not found!');
    },

    deleteComment: async (_, { postId, commentId }, context) => {
      const { username } = verifyToken(context);

      // Get post
      const post = await Post.findById(postId);

      if (post) {
        const commentIndex = post.comments.findIndex(c => c.id === commentId);

        // Check if the user is the original author of the comment
        if (post.comments[commentIndex].username === username) {
          post.comments.splice(commentIndex, 1);
          await post.save();
          return post;
        } else throw new AuthenticationError('Action not permitted!');
      } else throw new UserInputError('Post not found!');
    }
  }
};
