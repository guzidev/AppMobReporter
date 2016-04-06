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

.controller("IssueMapCtrl", function($scope, mapboxMapId, mapboxAccessToken) {
    var mapboxTileLayer = "http://api.tiles.mapbox.com/v4/" + mapboxMapId;
        mapboxTileLayer = mapboxTileLayer + "/{z}/{x}/{y}.png?access_token=" + mapboxAccessToken;
        // add default config to map..
        $scope.mapDefaults = {
        tileLayer: mapboxTileLayer
    };
    
    // add center point to map..
    $scope.mapCenter = {
        lat: 51.48,
        lng: 0,
        zoom: 4
    };
    
    // add markers on the map..
    $scope.mapMarkers = [];
    
    $scope.mapMarkers.push({
        lat: 51.48,
        lng: 0,
        message: "<p> Hello </p>",
        getMessageScope: function() {
            var scope = $scope.$new();
            scope.name = "World";
            return scope;
        }
    });
    

})


.controller('IssuesCtrl', function($scope, $http, apiUrl, $ionicLoading) {
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

    // au chargement du controlleur :
    // trouve les issues types
    // dès que c'est trouvé, recupère id, prêt pour l'envoie à filterIssues()
    // pour la requête utilise : $in de mongoDB

    $scope.filterIssues = function() {

        // Show a loading message if the request takes too long.
        $ionicLoading.show({
        template: 'Retrieving data...',
        delay: 750
        });

        $http({
            method: 'POST',
            url: apiUrl + '/issues/search',
            headers: {
            'Content-Type': 'application/json',
            'x-pagination': '0;20',          
            },
            data: {
                //'_issueType': '5703a17eaa8d790e00546b94'
                '_issueType': $scope.issueType.id
                // TO DO : continue filtering criteria
            }
    }).then(
        function(issues) {
            $ionicLoading.hide();
            // necessary? // Go to the issue list tab.
            //$state.go('tab.myIssues');
            $scope.issues = issues.data;

            console.log($scope.issues);
        },
        function() {
            // If an error occurs, hide the loading message and show an error message.
            $ionicLoading.hide();
            $scope.error = 'Could not get any Issues.';
      }
    )
    }
})

.controller('IssueDetailsCtrl', function($scope, $http, apiUrl, $stateparams) {
    $scope.issueId = $stateparams.issueId;
    //console.log("throw controller");
    $http({
        method: 'GET',
        //url: apiUrl + '/issues/' + $scope.issueId,
        url: apiUrl + '/issues/' + $stateparams.issueId,
        headers: {
            //'x-pagination': '0;20'
        }
    })
    .success(function(issue) {
        $scope.issue = issue;

    });
})


.controller('MyIssuesCtrl', function($scope, $http, apiUrl) {
    $scope.issues = {};
    $http({
        method: 'GET',
        url: apiUrl + '/me/issues',
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
            // pas besoin de setté 'x-user-id' car Auth.js s'en occupe à chaque requête http
            //'x-user-id': AuthService.currentUserId,
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
