var app = angular.module('bloggerApp', ['ngRoute', 'ui.router']);

//configuring routes
app.config(function ($locationProvider, $routeProvider) {
    $locationProvider.html5Mode({
    enabled:true,
    requireBase: false
 });
  $routeProvider
      .when('/', {
	      	  templateUrl: 'pages/home.html',
		  controller: 'homeCtrl',
		  controllerAs: 'vm'
		  })

      .when('/bloglist', {
	          templateUrl: 'pages/bloglist.html',
		  controller : 'listCtrl',
		  controllerAs: 'vm'
		  })

      .when('/blogadd', {
	          templateUrl: 'pages/blogadd.html',
		  controller: 'addCtrl',
		  controllerAs: 'vm'
		  })

        .when('/blogedit/:id', {
	          templateUrl: 'pages/blogedit.html',
		  controller: 'editCtrl',
		  controllerAs: 'vm'
		  })

	.when('/blogdelete/:id', {
		 templateUrl: 'pages/blogdelete.html',
		 controller: 'deleteCtrl',
		 controllerAs: 'vm'
	})

      .otherwise({redirectTo: '/'});
    });

//*** Controllers ***
app.controller('homeCtrl', function homeCtrl() {
    	var vm = this;
    	vm.title = "Emmanouil Richman Blog Site";
    	vm.message = "Welcome to my blog site!";
});

app.controller('listCtrl',['$http', '$scope',  function listCtrl($http, $scope){
	var vm = this;
	vm.title = "Emmanouil Richman Blog Site";
	vm.message = "Blog List";
	

	getAllBlogs($http)
		.then(function (data){
			$scope.blogs = data.data;
			console.log(data);
			vm.message = "Found blogs";
		},
		function (e){
			vm.message = "Could not get blog list";
		});
}]);

app.controller('addCtrl',[ '$http', '$location', function addCtrl($http, $location) {
	var vm = this;
    	vm.blog = {};
    	vm.title = "Emmanouil Richman Blog Site";
    	vm.message = "Add A Blog";
	
         vm.onSubmit = function() {

	var data = vm.blog;

	data.blog_title = userForm.blog_title.value;
	data.blog_text = userForm.blog_text.value;

	addOneBlog($http, data)
		.then(function successCallBack(data) {
		     console.log(data);
		     $location.path('/bloglist');
		},
		function errorCallBack(e) {
		    console.log(e);
		});
        };
}]);

app.controller('editCtrl', [ '$http', '$routeParams', '$scope', '$location',  function editCtrl($http, $routeParams, $scope, $location) {
    var vm = this;
    vm.title = "Emmanouil Richman Blog Site";
    vm.message = "Edit Your Blog";
    vm.id = $routeParams.id;

    readOneBlog($http, vm.id)
    	.then(function(data) {
    		$scope.blog = data.data;
    },
    function(e) {
    	vm.message = "Could not get blog with id: " + vm.id;
    });

    vm.onSubmit = function() {
    	var data = {};
    	data.blog_title = userForm.blog_title.value;
    	data.blog_text = userForm.blog_text.value;

    	updateOneBlog($http, data, vm.id)
    		.then(function(data) {
    		    vm.message = "Blog Updated!";
    		    $location.path('/bloglist');
    		},
    		function(e) {
    			vm.message = "Could not update blog with id: " + vm.id;
    		});
    }
}]);

app.controller('deleteCtrl', [ '$http', '$routeParams', '$scope','$location', function deleteCtrl($http, $routeParams, $scope, $location) {
    var vm = this;
    vm.title = "Emmanouil Richman Blog Site";
    vm.message = "Delete Your Blog";
    vm.id = $routeParams.id;
    readOneBlog($http, vm.id)
    	.then(function(data) {
    		$scope.blog = data.data;
    		vm.message = "Are you sure you wish to delete this blog?"
	},
    	function(e) {
    	vm.message = "Could not get blog with id: " + vm.id;
    });

    vm.onSubmit = function() {

    	deleteOneBlog($http,vm.id)
    		.then(function(data) {
    		    vm.message = "Blog Deleted Successfully!";
    		    $location.path('/bloglist');
    		},
    		function(e) {
    			vm.message = "Could not update blog with id: " + vm.id;
    		});
    }

}]);


/* REST Functions */
function getAllBlogs($http) {
    return $http.get('/api/blogs');
}

function readOneBlog($http, blogid) {
    return $http.get('/api/blogs/' + blogid);
}

function updateOneBlog($http, data, blogid) {
    return $http.put('/api/blogs/' + blogid , data);
}

function addOneBlog($http, data) {
    return $http.post('/api/blogs', data);
}

function deleteOneBlog($http, blogid) {
    return $http.delete('/api/blogs/' + blogid);
}
