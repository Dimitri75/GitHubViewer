(function() {
    var app = angular.module("GitHubViewer");

    var RepoController = function(
        $scope, $routeParams, $location, gitHub) {

        var onRepoComplete = function(data) {
            $scope.repo = data;
            gitHub.getContributors($scope.repo)
                .then(onContributorsComplete, onError);
        };
        
        var onContributorsComplete = function(data) {
            $scope.contributors = data;
        }
        
        var onError = function() {
            $scope.error = "Could not fetch the data.";
        };
        
        $scope.searchUser = function(username) {
            $location.path("/user/" + username);
        };

        $scope.username = $routeParams.username;
        $scope.reponame = $routeParams.reponame;
        
        gitHub.getRepo($scope.username, $scope.reponame)
            .then(onRepoComplete, onError);
    };

    app.controller("RepoController", ["$scope", "$routeParams", "$location", "gitHub", RepoController]);
}());