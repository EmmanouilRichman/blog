var express = require('express');
var router = express.Router();
var ctrlBlogs  = require('../controllers/blog');
var ctrlAuth = require('../controllers/authentication');

/* Setting up routes */
router.get('/blogs', ctrlBlogs.blogList);
router.get('/blogs/:blogid', ctrlBlogs.blogReturnOne);
router.post('/blogs', auth, ctrlBlogs.blogAddOne);
router.put('/blogs/:blogid', auth, ctrlBlogs.blogUpdate);
router.delete('/blogs/:blogid', auth, ctrlBlogs.blogDelete);
router.post('/register', ctrlAuth.register);
router.post('/login', ctrlAuth.login);

module.exports = router;                            
