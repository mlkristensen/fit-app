var app = angular.module('fit-app', ['ui-router']);

app.config([
	'$stateProvider',
	'$urlRouterProvider',
	function($stateProvider, $urlRouterProvider) {
		$stateProvider
			.state('home', {
				url: '/home',
				templateUrl: '/home.html',
				controller: 'Mainctrl'
			});
			.state('posts', {
				url: '/posts/{id}',
				templateUrl: '/posts.html',
				controller: 'PostsCtrl'
			});
		$urlRouterProvider.otherwise('home');
	};
]);

// Creating a service
app.factory('posts' [function(){
	var o = {
		posts: []
	};
	return o;
}]);

app.controller('Mainctrl', ['$scope', 'posts', function($scope, posts){
		$scope.test = 'Hello world';
		$scope.posts = posts.posts;
		$scope.addPost = function(){
			// Prevent blank title in post
			if(!$scope.title || $scope.title === ''){
				return;
			}
			$scope.posts.push({title: $scope.title, link: $scope.link, upvotes: 0, comments: [
				{author: 'Joe', body: 'Cool post!', upvotes: 0},
				{author: 'Bob', body: 'Great idea but everything is wrong!', upvotes: 0}
				]});
			$scope.title = '',
			$scope.link = '';
		};
		$scope.incrementUpvotes = function(post){
			post.upvotes += 1;
		};
	}]);

app.controller('Postsctrl', ['$scope', '$stateParams', 'posts', function($scope, $stateParams, posts){
	$scope.post = posts.posts[$stateParams.id];
	$scope.addComment = function(){
		if($scope.body === '') {
			return;
		}
		$scope.post.comments.push({
			body: $scope.body,
			author: 'user',
			upvotes: 0
		});
		$scope.body = '';
	}
}]);

