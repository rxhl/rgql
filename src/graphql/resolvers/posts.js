const { AuthenticationError } = require('apollo-server');

// utils
const Post = require('../../models/Post');
const verifyToken = require('../../util/verifyToken');

module.exports = {
  Query: {
    getPosts: async () => {
      try {
        const posts = await Post.find().sort({ createdAt: -1 });
        return posts;
      } catch (error) {
        throw new Error(error);
      }
    },
    getPost: async (_, { postId }) => {
      try {
        const post = await Post.findById(postId);
        if (post) return post;
        else throw new Error('Post not found');
      } catch (err) {
        throw new Error(err);
      }
    }
  },
  Mutation: {
    async createPost(_, { body }, context) {
      // Check if user is valid
      const user = verifyToken(context);

      // Create a new post for that user
      const newPost = new Post({
        body,
        user: user.userId,
        username: user.username,
        createdAt: new Date().toISOString()
      });
      const post = await newPost.save();
      return post;
    },

    async deletePost(_, { postId }, context) {
      // Check if user is valid
      const user = verifyToken(context);

      // Check if the user is the original author
      try {
        const post = await Post.findById(postId);
        if (user.username === post.username) {
          await post.delete();
          return 'Post deleted successfully!';
        } else throw new AuthenticationError('Action not allowed!');
      } catch (err) {
        throw new Error(err);
      }
    }
  }
};
