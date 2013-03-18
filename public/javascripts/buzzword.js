angular.module('buzzword', ['btford.socket-io']).
	config(function($routeProvider) {
    	$routeProvider.
      		when('/', 				{controller:LoginController,	templateUrl:'login.html'}).
      		when('/lobby', 			{controller:LobbyController,	templateUrl:'lobby.html'}).
      		when('/quiz/:id',		{controller:QuizController,		templateUrl:'quiz.html'}).
      		otherwise({redirectTo:'/'});
  	}).
  	service('users', Users);

function Users() {

	var me = {};

	return {
		me: function() {
			return me;
		}
	}

}


function LoginController($scope, $location, socket, users) {

	$scope.login = function() {
		console.log("logger inn" + $scope.nickname);

		socket.emit('login', {"nickname": $scope.nickname}, function(result) {

			console.log("result: " +result);

			if (!result) {
				console.log("ERRRORR");
				return;
			}

			users.me.nickname = $scope.nickname;

			$location.path('lobby');

		});

	};


	socket.on('question', function(data) {
		console.log(data);
	});
}


function LobbyController($scope, socket, users) {

	$scope.nickname = users.me.nickname;

	$scope.users = [];

	socket.emit("users", {}, function(result) {
		console.log("result: " +result);

		$scope.users = result;
	})

}


function QuizController($scope, socket) {


}