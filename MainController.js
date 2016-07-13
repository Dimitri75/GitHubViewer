(function() {
    var app = angular.module("GitHubViewer");

    var MainController = function(
        $scope, $interval, $location) {

        $scope.search = function(username) {
            if (countdownInterval) {
                $interval.cancel(countdownInterval);
                $scope.countdown = 0;
            }
            $location.path("/user/" + username);
        };

        $scope.decrementCountdown = function() {
            --$scope.countdown;

            if ($scope.countdown <= 0)
                $scope.search($scope.username);
        }

        var countdownInterval = null;
        var startCountdown = function() {
            countdownInterval = $interval($scope.decrementCountdown, 1000, $scope.countdown);
        };

        $scope.username = "Angular";
        $scope.countdown = 25;
        startCountdown();
    };

    app.controller("MainController", ["$scope", "$interval", "$location", MainController]);
}());