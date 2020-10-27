var app = angular.module('bloggerApp');

//*** Directives ***
app.directive('navigation', function() {
    return {
      restrict: 'EA',
      templateUrl: '/common/nav/navigation.html',
      controller: 'navCtrl',
      controllerAs: 'vm'
    };
});

//*** Controller ***
app.controller('navCtrl', ['$state', '$location', 'authentication', function navCtrl($state, $location, authentication) {
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
