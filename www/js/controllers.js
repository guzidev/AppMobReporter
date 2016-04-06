angular.module('citizen-engagement.controllers', [])


/*
 * TO DO : GUZI
 * - /:id
 * - [DONE] filter criteria (lvl 1 -> me)
 * - [WORK IN PROGRESS] filter criteria (lvl 2 -> search)
 * - [TO DO] pagination filter
 * - [TO DO] handle actions
 * - [TO DO] extract and extract all $http calls from individual controllers
 */



.controller("IssueMapCtrl", function($scope, mapboxMapId, mapboxAccessToken, $http, apiUrl) {
    var mapboxTileLayer = "http://api.tiles.mapbox.com/v4/" + mapboxMapId;
        mapboxTileLayer = mapboxTileLayer + "/{z}/{x}/{y}.png?access_token=" + mapboxAccessToken;
        // add default config to map..
        $scope.mapDefaults = {
        tileLayer: mapboxTileLayer
    };
    
    // add center point to map..
    $scope.mapCenter = {
        lat: 46.78,
        lng: 6.64,
        zoom: 14
    };
    
    // add markers on the map..
    $scope.mapMarkers = [];
    
    
    // add all markers..
    $http({
        method: 'GET',
        url: apiUrl + '/issues',
        headers: {
            'x-pagination': '0;20',          
        }
    })
    .success(function(issues) {
        $scope.issues = issues;
        
        angular.forEach(issues, function(value, key) {
            console.log(key + ': ' + value.description);
            $scope.mapMarkers.push({
                lat: value.lat,
                lng: value.lng,
                message: '<p>' + value.description + '</p>'
            })
        })
    });
    
    /*
    // add one test marker..
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
    */

    // add a single (or a group of) markers..
    $scope.addMarker = function() {
        // insert code here...
    }

    

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
