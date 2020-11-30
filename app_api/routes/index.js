var express = require('express');
var router = express.Router();
var jwt = require('express-jwt');
var auth = jwt({ 
  secret: process.env.JWT_SECRET,
  userProperty: 'payload'
});
var ctrlBlogs  = require('../controllers/blog');
var ctrlAuth = require('../controllers/authentication');
var ctrChat = require('../controllers/chatBackend');

/* Setting up routes */
router.get('/blogs', ctrlBlogs.blogList);
router.get('/blogs/:blogid', ctrlBlogs.blogReturnOne);
router.get('/chat', ctrlChat.getChats);
router.post('/blogs', auth, ctrlBlogs.blogAddOne);
router.put('/blogs/:blogid', auth, ctrlBlogs.blogUpdate);
router.delete('/blogs/:blogid', auth, ctrlBlogs.blogDelete);
router.post('/register', ctrlAuth.register);
router.post('/login', ctrlAuth.login);

module.exports = router;                            
