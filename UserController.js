(function() {
    var app = angular.module("GitHubViewer");

    var UserController = function(
        $scope, $routeParams, $location, gitHub) {

        var onUserComplete = function(data) {
            $scope.user = data;
            gitHub.getRepos($scope.user).then(onReposComplete, onError);
        }

        var onReposComplete = function(data) {
            $scope.user.repos = data;
        };

        var onError = function(reason) {
            $scope.error = "Could not fetch the data.";
        };
        
        $scope.getRepoDetails = function(username, reponame) {
            $location.path("#/repo/" + username + "/" + reponame);
        };
        
        $scope.username = $routeParams.username;
        $scope.reposSortOrder = "-stargazers_count";
        
        gitHub.getUser($scope.username)
            .then(onUserComplete, onError);
    };

    app.controller("UserController", ["$scope", "$routeParams", "$location", "gitHub", UserController]);
}());