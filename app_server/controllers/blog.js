var request = require('request');
var apiOptions = {
	server : "http://34.226.201.110" // Change as needed
};         

module.exports.blogadd = function(req, res){
	res.render('blog-add', {title: 'Blog Add'});
};

/* Blog Add Post */
module.exports.addBlog = function(req, res){
    var requestOptions, path, postdata;
    path = '/api/blogs';

    postdata = {
        blog_title: req.body.blog_title,
        blog_text: req.body.blog_text,
	createdOn: Date.now()
    };

    requestOptions = {
      url : apiOptions.server + path,
      method : "POST",
      json : postdata
    };

    request(
      requestOptions,
      function(err, response, body) {
         if (response.statusCode === 201) {
              res.redirect('/bloglist');
         } else {
              _showError(req, res, response.statusCode);
         }
      }
    );
};

module.exports.bloglist = function(req, res){
	var requestOptions, path;
    	path = '/api/blogs';
    	requestOptions = { 
        url : apiOptions.server + path,
        method : "GET",
        json : {},
        qs : {} 
        };
    request(
        requestOptions,
        function(err, response, body) {
            renderListPage(req, res, body);
        }
    );
};

/* Render the blog list page */
var renderListPage = function(req, res, responseBody){
    res.render('blog-list', {
        title: 'Blog List',
        pageHeader: {
            title: 'Blog List'
        },
        blogs: responseBody
    });
};

module.exports.readOne = function(req, res){
    var requestOptions, path;
    path = "/api/blogs/" + req.params.blogid;
    requestOptions = {
        url : apiOptions.server + path,
        method : "GET",
        json : {}
    }; 
    request(
        requestOptions,
        function(err, response, body) {
                renderEditPage(req, res, body);
        }
    );
};

/* Render the blog edit page */
var renderEditPage = function(req, res, responseBody){
    res.render('blog-edit', {
        title: 'Edit Blog',
        pageHeader: {
            title: 'Blog Edit'
        },
        blog: responseBody
    });
};

module.exports.editPost = function(req, res){
    var requestOptions, path, postdata;
    var id = req.params.blogid;
    path = '/api/blogs/' + id;

    postdata = {
        blog_title: req.body.blog_title,
        blog_text: req.body.blog_text
    };

    requestOptions = {
        url : apiOptions.server + path,
        method : "PUT",
        json : postdata
    };

    request(
	requestOptions,
        function(err, response, body) {
            if (response.statusCode === 201) {
                res.redirect('/bloglist');
            } else {
                _showError(req, res, response.statusCode);
            }
        }
    );
};

/* Blog Delete */
module.exports.blogdelete = function(req, res){
    var requestOptions, path;
    path = "/api/blogs/" + req.params.blogid;
    requestOptions = {
        url : apiOptions.server + path,
        method : "GET",
        json : {}
    };
    request(
	requestOptions,
        function(err, response, body) {
            renderDeletePage(req, res, body);
        }
    );
};

/* Render the blog delete page */
var renderDeletePage = function(req, res, responseBody){
        res.render('blog-delete', {
        title: 'Delete Blog',
        pageHeader: {
                title: 'Delete  Blog'
        },
        blog: responseBody
    });
};

/* Blog Delete Post */
module.exports.deletePost = function(req, res){
    var requestOptions, path, postdata;
    var id = req.params.blogid;
    path = '/api/blogs/' + id;

    requestOptions = {
	url : apiOptions.server + path,
        method : "DELETE",
        json : {}
    };

    request(
        requestOptions,
        function(err, response, body) {
            if (response.statusCode === 204) {
                res.redirect('/bloglist');
            } else {
                _showError(req, res, response.statusCode);
            }
        }
    );
};
