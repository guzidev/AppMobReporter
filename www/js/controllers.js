angular.module('citizen-engagement.controllers', [])


/*
 * TO DO : GUZI
 * - /:id
 * - filter criteria (lvl 1 -> me)
 * - filter criteria (lvl 2 -> search)
 * - pagination filter
 * - handle actions
 *
 */

.controller('UserController', function($scope, $http) {
           $scope.data = [
			{ firstName: "John", lastName: "Doe" },
			{ firstName: "John", lastName: "Smith" },
			{ firstName: "David", lastName: "Lowe" },
			{ firstName: "Mark", lastName: "Holloway" }
		]; 
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

.controller('IssueTypesCtrl', function($scope, $http, apiUrl) {
    $scope.issues = {};
    $http({
        method: 'GET',
        url: apiUrl + '/issueTypes',
        headers: {
            'x-pagination': '0;20'
        }
    })
    .success(function(issues) {
        $scope.issues = issues;
    });
})

;
