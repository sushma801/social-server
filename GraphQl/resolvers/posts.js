const { AuthenticationError } = require("apollo-server");

const Post = require("../../modals/Post");
const checkAuth = require("../../utils/check-auth");
module.exports = {
  Query: {
    async getPosts() {
      try {
        const posts = await Post.find().sort({ createdAt: -1 });
        console.log(posts);
        return posts;
      } catch (e) {
        console.log(e);
      }
    },

    async getPost(_, { postId }) {
      console.log(`post id is here ${postId}`);
      try {
        const post = await Post.findById({ _id: postId });
        if (post) {
          return post;
        } else {
          throw new Error("Post not found");
        }
      } catch (e) {
        console.log(e);
        throw new Error(e);
      }
    },
  },
  Mutation: {
    async createPost(_, { body }, context) {
      const user = checkAuth(context);
      console.log(user);

      const newPost = new Post({
        body,
        user: user.id,
        username: user.username,
        createdAt: new Date().toISOString(),
      });
      console.log(newPost);

      const post = await newPost.save();
      return post;
    },

    async deletePost(_, { postId }, context) {
      const user = checkAuth(context);
      try {
        const post = await Post.findById({ _id: postId });
        console.log({ post });
        if (user.username === post.username) {
          await post.deleteOne();
          return "Post deleted successfully";
        } else {
          throw new AuthenticationError("Action not allowed");
        }
      } catch (e) {
        throw new Error(e);
      }
    },
  },
};
