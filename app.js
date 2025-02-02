// Define the Angular application
var app = angular.module('courseApp', []);

// Define the controller
app.controller('CourseController', function($scope, $http) {
    $scope.user = {
        name: '',
        email: '',
        course: '',
        reason: ''
    };

    $scope.submitForm = function() {
        if ($scope.courseForm.$valid) {
            // Prepare data to send to backend
            const data = {
                name: $scope.user.name,
                email: $scope.user.email,
                course: $scope.user.course,
                reason: $scope.user.reason
            };

            // Send data to the server (POST request)
            $http.post('/submit', data)
                .then(function(response) {
                    // Handle success
                    $scope.message = 'Registration successful!';
                }, function(error) {
                    // Handle error
                    $scope.message = 'Error: ' + error.statusText;
                });
        }
    };
});
