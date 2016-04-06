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

.controller('IssuesCtrl', function($scope, $http, apiUrl) {
    $scope.issues = {};
    
    $http({
        method: 'GET',
        url: apiUrl + '/issues',
        headers: {
            'x-pagination': '0;20',          
        }
    })
    .success(function(issues) {
        $scope.issues = issues;
    });

    $scope.filterIssues = function() {

        // Show a loading message if the request takes too long.
        $ionicLoading.show({
        template: 'Logging in...',
        delay: 750
        });

        $http({
            method: 'GET',
            url: apiUrl + '/issues',
            headers: {
            'Content-Type': 'application/json',
            'x-pagination': '0;20',          
            },
            data: {
                id: '5703a17eaa8d790e00546e53'
            }
    }).then(
        function(issues) {
            $ionicLoading.hide();
            // necessary? // Go to the issue list tab.
            //$state.go('tab.myIssues');
        },
        function() {
            // If an error occurs, hide the loading message and show an error message.
            $ionicLoading.hide();
            $scope.error = 'Could not get any Issues.';
      }
    )
    }
})

.controller('MyIssuesCtrl', function($scope, $http, apiUrl) {
    $scope.issues = {};
    $http({
        method: 'GET',
        url: apiUrl + '/me/issues',
        headers: {
            'x-pagination': '0;20',
            'x-user-id': AuthService.currentUserId
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
