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
}


function LobbyController($scope, $location, socket, users) {

	$scope.nickname = users.me.nickname;

	$scope.users = [];

	socket.emit("users", {}, function(result) {
		console.log("result: " +result);

		$scope.users = result;
	})

	$scope.createQuiz = function() {

		socket.emit("createQuiz", {}, function(result) {

			var id = result;

			$location.path('quiz/' + id);
		});

	}

}


function QuizController($scope, $location, $routeParams, socket, users) {

	$scope.nickname = users.me.nickname;

	$scope.question = {};

	$scope.points = 0;

	socket.emit("startQuiz", {id: $routeParams.id});

	socket.on('question', function(data) {
		console.log(data);

		$scope.question = data;
	});

	socket.on('gameOver', function(data) {
		console.log(data);

		$scope.question = {};
		$scope.points = data.points;
	});

	$scope.guessAnswer = function(guess) {
		console.log(guess);

		socket.emit("answer", {"id": $routeParams.id, "guess": guess});
	}



}