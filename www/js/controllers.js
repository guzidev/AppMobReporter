angular.module('citizen-engagement.controllers', [])

        .controller('UserController', function($scope, $http) {
           $scope.data = [
			{ firstName: "John", lastName: "Doe" },
			{ firstName: "John", lastName: "Smith" },
			{ firstName: "David", lastName: "Lowe" },
			{ firstName: "Mark", lastName: "Holloway" }
		]; 
                
            //$http.get('apiUrl')
})

.controller('IssuesCtrl', function($scope, $http, apiUrl) {
    $scope.issues = {};
    $http({
        method: 'GET',
        url: apiUrl + '/issues',
        headers: {
            'x-pagination': '0;20'
        }
    })
    .success(function(issues) {
        $scope.issues = issues;
    });
})

.controller('UsersCtrl', function($scope, $http, apiUrl) {
    $scope.issues = {};
    $http({
        method: 'GET',
        url: apiUrl + '/users',
        headers: {
            'x-pagination': '0;10',
            'x-user-id': AuthService.currentUserId,
        }
    })
    .success(function(issues) {
        $scope.issues = issues;
    });
})

.controller('IssuesCtrl', function($scope, $http, apiUrl) {
    $scope.issues = {};
    $http({
        method: 'GET',
        url: apiUrl + '/issues',
        headers: {
            'x-pagination': '0;100'
        }
    })
    .success(function(issues) {
        $scope.issues = issues;
    });
})

;
