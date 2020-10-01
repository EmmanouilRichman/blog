var mongoose = require('mongoose');
var Blog = mongoose.model('Blog');
                                                        
var sendJSONresponse = function(res, status, content) {
  res.status(status);
  res.json(content);
};

module.exports.blogList = function (req, res) {
  Blog
      .find()
      .exec(function(err, results) {
        if (!results) {
          sendJSONresponse(res, 404, {
            "message": "no Blogs found"
          });
          return;
        } else if (err) {
          console.log(err);
          sendJSONresponse(res, 404, err);
          return;
        }
        console.log(results);
        sendJSONresponse(res, 200, buildBlogList(req, res, results));
      }); 
};

var buildBlogList = function(req, res, results) {
  var blogs = [];
  results.forEach(function(obj) {
      blogs.push({
      blog_title: obj.blog_title,
      blog_text: obj.blog_text,
      createdOn: obj.createdOn,
      _id: obj._id
    });
  });
  return blogs;
};



module.exports.blogReturnOne = function (req, res) {
 if (req.params && req.params.locationid) {
    Blog
      .findById(req.params.blogid)
      .exec(function(err, blog) {
        if (!blog) {
          sendJSONresponse(res, 404, {
            "message": "blogid not found"
          });
          return;
        } else if (err) {
          console.log(err);
          sendJSONresponse(res, 404, err);
          return;
        }
        console.log(blog);
        sendJSONresponse(res, 200, blog);
      });
  } else {
    console.log('No blogid specified');
    sendJSONresponse(res, 404, {
      "message": "No blogid in request"
    });
  }
};

module.exports.blogAddOne = function (req, res) {
   console.log(req.body);
  Blog
   .create({
      blog_title: req.body.blog_title,
      blog_text: req.body.blog_text
       }
       ,function(err, blog) {
       if (err) {
          console.log(err);
          sendJSONresponse(res, 400, err);
       } else {
          console.log(blog);
          sendJSONresponse(res, 201, blog);
       }
     }
   );
};

module.exports.blogUpdate = function (req, res) {
   console.log("Updating a book entry with id of " + req.params.id);
    Blog
  	  .findOneAndUpdate(
	     { _id: req.params.id },
 	     { $set: {"Blog_title": req.body.blog_title, "blog_text": req.body.blog_text}},
	     function(err, response) {
	         if (err) {
	  	         sendJSONresponse(res, 400, err);
	         } else {
		        sendJSONresponse(res, 201, response);
	        }
	    }
    );
};

module.exports.blogDelete = function (req, res) {
  console.log("Deleting blog entry with id of " + req.params.id);
  console.log(req.body);
    Blog
        .findByIdAndRemove(req.params.id)
        .exec (
            function(err, response) {
                if (err) {
                            sendJSONresponse(res, 404, err);
                } else {
                            sendJSONresponse(res, 204, null);
                }
            }
        );
};