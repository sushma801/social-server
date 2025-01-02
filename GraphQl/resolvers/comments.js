const { UserInputError, AuthenticationError } = require("apollo-server");
const Post = require("../../modals/Post");
const checkAuth = require("../../utils/check-auth");

module.exports = {
  Mutation: {
    async createComment(_, { postId, body }, context) {
      console.log({ postId }, { body });
      const { username } = checkAuth(context);
      if (body.trim() === "") {
        throw new UserInputError("Empty comment", {
          errors: {
            body: "Comment body must not empty",
          },
        });
      }
      const post = await Post.findById({ _id: postId });
      if (post) {
        post.comments.unshift({
          body,
          username,
          createdAt: new Date().toISOString(),
        });
        await post.save();
        return post;
      } else throw new UserInputError("Post not Found");
    },
    deleteComment: async (_, { postId, commentId }, context) => {
      const user = checkAuth(context);
      const post = await Post.findById({ _id: postId });

      if (post) {
        const commentIndex = post.comments.findIndex(
          (c) => c._id.toString() === commentId
        );
        if (post.comments[commentIndex].username === user.username) {
          post.comments.splice(commentIndex, 1);
          await post.save();
          return post;
        } else {
          throw new AuthenticationError("Action not allowed");
        }
      } else {
        throw new UserInputError("Post not found");
      }
    },
    likePost: async (_, { postId }, context) => {
      const user = checkAuth(context);
      const post = await Post.findById({ _id: postId });
      if (post) {
        if (post.likes.find((like) => like.username !== user.username)) {
          post.likes = post.likes.filter(like.username !== username);
        } else {
          const username = user.username;
          post.likes.push({
            username,
            createdAt: new Date().toISOString(),
          });
        }
        await post.save();
        return post;
      } else {
        throw new UserInputError("Post not found");
      }
    },
  },
};
