var express = require('express');
var router = express.Router();
var ctrlBlogs  = require('../controllers/blog');

/* Setting up routes */
router.get('/blogs', ctrlBlogs.blogList);
router.get('/blogs/:blogid', ctrlBlogs.blogReturnOne);
router.post('/blogs', ctrlBlogs.blogAddOne);
router.put('/blogs/:blogid', ctrlBlogs.blogUpdate);
router.delete('/blogs/:blogid', ctrlBlogs.blogDelete);

module.exports = router;                            
