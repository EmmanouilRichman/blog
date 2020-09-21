module.exports.blogadd = function(req, res){
	res.render('blog-add', {title: 'Blog Add'});
};

module.exports.bloglist = function(req, res){
	res.render('blog-list', {
		title: 'Blog List',
	blogEntries: [{
		blog_title: 'Blog1',
		blog_text: 'This is my first post',
		createdOn: '9-21-2020'
	},

	{
			
		blog_title: 'Blog2',
		blog_text: 'This is my second post and it is longer to show how my formatting works Lorem ipsum dolor sit amet, c			    onsectetur adipiscing elit. Integer porta nulla a volutpat iaculis. Ut mauris neque, elementum et dui 			     quis, porttitor mattis eros. Quisque id nisl commodo, consequat augue.',
		createdOn: '9-21-2020'
	},

	{
	
		blog_title: 'Blog3',
		blog_text: 'This is my third post',
		createdOn: '9-21-2020'
	}

	]
	
	});
};

module.exports.blogedit = function(req, res){
	res.render('blog-edit', {title: 'Edit Blog'});
};

module.exports.blogdelete = function(req, res){
	res.render('blog-delete', {title: 'Delete Blog'});
};
