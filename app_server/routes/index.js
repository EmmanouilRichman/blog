var express = require('express');
var router = express.Router();
var ctrlHome = require('../controllers/home');
var ctrlBlog = require('../controllers/blog');

/* Setting up routes */
router.get('/', ctrlHome.home);
router.get('/bloglist', ctrlBlog.bloglist);
router.get('/blogadd',  ctrlBlog.blogadd);
router.get('/blogedit', ctrlBlog.blogedit);
router.get('/blogdelete', ctrlBlog.blogdelete);

module.exports = router;
