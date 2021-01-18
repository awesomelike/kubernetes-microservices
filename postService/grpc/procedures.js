const Post = require('../repository/post');

module.exports = {
  listAll: async (call, callback) => {
    try {
      const posts = await Post.find();
      callback(null, posts);  
    } catch (error) {
      callback({ code: 'INTERNAL_ERROR' }); 
    }
  },
  create: async (call, callback) => {
    try {
      const { request } = call;
      const post = await Post.create(request);
      callback(null, post);
    } catch (error) {
      callback({ code: 'INTERNAL_ERROR' });
    }
  },
  listUserPosts: async (call, callback) => {
    try {
      const { request } = call;
      if (!request.userId) {
        return callback({ code: 'INTERNAL_ERROR' });
      }
      const posts = await Post.find({ userId });
      callback(null, posts);
    } catch (error) {
      return callback({ code: 'INTERNAL_ERROR' });
    }
  }
};
