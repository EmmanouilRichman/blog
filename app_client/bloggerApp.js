var app = angular.module('bloggerApp', ['ngRoute', 'ui.router']);

//*** Authentication Service and Methods **
app.service('authentication', authentication);
    authentication.$inject = ['$window', '$http'];
    function authentication ($window, $http) {

        var saveToken = function (token) {
            $window.localStorage['blog-token'] = token;
        };

        var getToken = function () {
            return $window.localStorage['blog-token'];
        };

        var register = function(user) {
            console.log('Registering user ' + user.email + ' ' + user.password);
            return $http.post('/api/register', user).then(function(data){
                saveToken(data.data.token);
          });
        };

        var login = function(user) {
           console.log('Attempting to login user ' + user.email + ' ' + user.password);
            return $http.post('/api/login', user).then(function(data) {
            	 saveToken(data.data.token);
		    });
        };

        var logout = function() {
            $window.localStorage.removeItem('blog-token');
        };

        var isLoggedIn = function() {
          var token = getToken();

          if(token){
           var payload = JSON.parse($window.atob(token.split('.')[1]));

            return payload.exp > Date.now() / 1000;
          } else {
            return false;
          }
        };

        var currentUser = function() {
          if(isLoggedIn()){
            var token = getToken();
            var payload = JSON.parse($window.atob(token.split('.')[1]));
            return {
              email : payload.email,
              name : payload.name
            };
          }
        };

        return {
          saveToken : saveToken,
          getToken : getToken,
          register : register,
          login : login,
          logout : logout,
          isLoggedIn : isLoggedIn,
          currentUser : currentUser
        };
}

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

	.when('/register', {
        templateUrl: '/common/auth/register.html',
        controller: 'registerCtrl',
        controllerAs: 'vm'
      })

     	.when('/login', {
        templateUrl: '/common/auth/login.html',
        controller: 'loginCtrl',
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

app.controller('listCtrl',['$http', '$scope', 'authentication',  function listCtrl($http, $scope, authentication){
	var vm = this;
	vm.title = "Emmanouil Richman Blog Site";
	vm.message = "Blog List";

	 vm.isLoggedIn = function() {
        	return authentication.isLoggedIn();
   	 }
	

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

app.controller('addCtrl',[ '$http', '$location', 'authentication' , function addCtrl($http, $location, authentication) {
	var vm = this;
    	vm.blog = {};
    	vm.title = "Emmanouil Richman Blog Site";
    	vm.message = "Add A Blog";
	
         vm.onSubmit = function() {

	var data = vm.blog;

	data.blog_title = userForm.blog_title.value;
	data.blog_text = userForm.blog_text.value;

	addOneBlog($http, data, authentication)
		.then(function successCallBack(data) {
		     console.log(data);
		     $location.path('/bloglist');
		},
		function errorCallBack(e) {
		    console.log(e);
		});
        };
}]);

app.controller('editCtrl', [ '$http', '$routeParams', '$scope', '$location', 'authentication',  function editCtrl($http, $routeParams, $scope, $location, authentication) {
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

    	updateOneBlog($http, data, vm.id, authentication)
    		.then(function(data) {
    		    vm.message = "Blog Updated!";
    		    $location.path('/bloglist');
    		},
    		function(e) {
    			vm.message = "Could not update blog with id: " + vm.id;
    		});
    }
}]);

app.controller('deleteCtrl', [ '$http', '$routeParams', '$scope','$location', 'authentication', function deleteCtrl($http, $routeParams, $scope, $location, authentication) {
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

    	deleteOneBlog($http,vm.id, authentication)
    		.then(function(data) {
    		    vm.message = "Blog Deleted Successfully!";
    		    $location.path('/bloglist');
    		},
    		function(e) {
    			vm.message = "Could not update blog with id: " + vm.id;
    		});
    }

}]);

app.controller('loginCtrl', [ '$http', '$location', 'authentication', function loginCtrl($htttp, $location, authentication) {
    var vm = this;

    vm.title = 'Sign in to Blogger';

    vm.credentials = {
      email : "",
      password : ""
    };

    vm.returnPage = $location.search().page || '/';

    vm.onSubmit = function () {
      vm.formError = "";
      if (!vm.credentials.email || !vm.credentials.password) {
           vm.formError = "All fields required, please try again";
        return false;
      } 
	  else {
           vm.doLogin();
      }
    };

     vm.doLogin = function() {
      vm.formError = "";
      authentication
        .login(vm.credentials)
        .then(function(){
          $location.search('page', null); 
          $location.path(vm.returnPage);
	},function(e){ vm.formError = e.data.message;});
        };
 }]);

app.controller('registerCtrl', [ '$http', '$location', 'authentication', function registerCtrl($htttp, $location, authentication) {
    var vm = this;

    vm.title = 'Create a new Blogger account'

    vm.credentials = {
      name : "",
      email : "",
      password : ""
    };

    vm.returnPage = $location.search().page || '/';

    vm.onSubmit = function () {
      vm.formError = "";
      if (!vm.credentials.name || !vm.credentials.email || !vm.credentials.password) {
        vm.formError = "All fields required, please try again";
        return false;
      } else {
        vm.doRegister();
      }
    };

    vm.doRegister = function() {
      vm.formError = "";
      authentication
        .register(vm.credentials)
        .then(function(){
          $location.search('page', null);
          $location.path('/');
	 },function(e){vm.formError = "Email Already Registered"});
    };
}]);

app.directive('navigation', function() {
    return {
      restrict: 'EA',
      templateUrl: '/common/nav/navigation.html',
      controller: 'NavigationController',
      controllerAs: 'vm'
    };
});

app.controller('NavigationController', ['$state', '$location', 'authentication', function NavigationController($state, $location, authentication) {
    var vm = this;
    vm.currentPath = $location.path();
    vm.currentUser = function()  {
        return authentication.currentUser();
    }
    vm.isLoggedIn = function() {
        return authentication.isLoggedIn();
    }
    vm.logout = function() {
      authentication.logout();
      $location.path('/');
    };
}]);


/* REST Functions */
function getAllBlogs($http) {
    return $http.get('/api/blogs');
}

function readOneBlog($http, blogid) {
    return $http.get('/api/blogs/' + blogid);
}

function updateOneBlog($http, data, blogid, authentication) {
    return $http.put('/api/blogs/' + blogid , data, { headers: { Authorization: 'Bearer '+ authentication.getToken() }});
}

function addOneBlog($http, data, authentication) {
    return $http.post('/api/blogs', data, { headers: { Authorization: 'Bearer '+ authentication.getToken() }});
}

function deleteOneBlog($http, blogid, authentication) {
    return $http.delete('/api/blogs/' + blogid, { headers: { Authorization: 'Bearer '+ authentication.getToken() }});
}
