var express = require('express');
var router = express.Router();
var ctrlHome = require('../controllers/home');
var ctrlBlog = require('../controllers/blog');

/* Setting up routes */
router.get('/', ctrlHome.home);
router.get('/bloglist', ctrlBlog.bloglist);
router.get('/blogadd',  ctrlBlog.blogadd);
router.post('/blogadd',  ctrlBlog.addBlog);
router.get('/blogedit/:blogid', ctrlBlog.readOne);
router.post('/blogedit/:blogid', ctrlBlog.editPost);
router.get('/blogdelete/:blogid', ctrlBlog.blogdelete);
router.post('/blogdelete/:blogid', ctrlBlog.deletePost);
module.exports = router;
