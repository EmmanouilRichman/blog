var mongoose = require('mongoose');

var blogSchema = new mongoose.Schema({
	blog_title: String,
	blog_text: String,
	createdOn: {
		type: Date,
		"default": Date.now
	}

});

mongoose.model('Blogs', blogSchema);
