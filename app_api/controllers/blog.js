var mongoose = require('mongoose');
var Loc = mongoose.model('Blog');
                                                        
var sendJSONresponse = function(res, status, content) {
  res.status(status);
  res.json(content);
};

module.exports.blogList = function (req, res) {
  sendJSONresponse(res, 200, {"status" : "success"});
};

module.exports.blogReturnOne = function (req, res) {
  sendJSONresponse(res, 200, {"status" : "success"});
};

module.exports.blogAddOne = function (req, res) {
  sendJSONresponse(res, 200, {"status" : "success"});
};

module.exports.blogUpdate = function (req, res) {
  sendJSONresponse(res, 200, {"status" : "success"});
};

module.exports.blogDelete = function (req, res) {
  sendJSONresponse(res, 200, {"status" : "success"});
};
