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

.controller("PhotoController", function(CameraService) {
    CameraService.getPicture({
        quality: 75,
        targetWidth: 400,
        targetHeight: 300,
        //destinationType: Camera.DestinationType.DATA_URL
    })
    .then(function(imageData) {
    // do something with imageData
    });
})


/** CONTROLER MAP ISSUES **/
/* Controler pour la gestion de la map   */
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
            'x-pagination': '0;50',          
        }
    })
    .success(function(issues) {
        $scope.issues = issues;
        
        angular.forEach(issues, function(issue, key) {
            console.log(key + ': ' + issue.description);
            $scope.mapMarkers.push({
                lat: issue.lat,
                lng: issue.lng,
                message: '<p>'+' '+issue.issueType.name +' '+ issue.issueType.description +' '+ issue.owner.name +' '+ issue.createdOn +'</p>'
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

/** CONTROLER SHOW ISSUES **/
/* Controler pour la gestion de     */
/* l'affichage des Issues           */
.controller('IssuesCtrl', function($scope, $http, apiUrl, $ionicLoading, $timeout) {
    $scope.issues = {};
    
    $http({
        method: 'GET',
        url: apiUrl + '/issues',
        headers: {
            'x-pagination': '0;5',          
        }
    })
    .success(function(issues) {
        $scope.issues = issues;
    });

    $http({
        method: 'GET',
        url: apiUrl + '/issueTypes',
        headers: {
        // insert here if ...          
        }
    })
    .success(function(issueTypes) {
        $scope.issueTypes = issueTypes;
    });

    var counter = 1;

    // Gestion du Pull refresh 
    // TO DO - replace with "infinite scroll"
    $scope.doRefresh = function() {
        
        console.log('Refreshing!' + counter);
        $timeout( function() {
                                $http({
                                    method: 'GET',
                                    url: apiUrl + '/issues',
                                    headers: {
                                        'x-pagination': counter + ';5',          
                                    }
                                })
                                .success(function(issues) {
                                    //simulate async response
                                    //$scope.issues.push(issues);
                                    //$scope.issues=issues;
                                    $scope.issues=$scope.issues.concat(issues);
                                });
                                counter++;


          //Stop the ion-refresher from spinning
          $scope.$broadcast('scroll.refreshComplete');
        }, 1000);
      
    };
  
    /** METHODE filterIssues  **/
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


/** CONTROLER affichage d'un ISSUE **/
/* Controler pour la gestion de     */
/* l'affichage de un Issues           */
.controller('IssueDetailsCtrl', function($scope, $http, apiUrl, $stateParams) {
    $scope.issueId = $stateParams.issueId;
    //console.log("throw controller");
    $http({
        method: 'GET',
        //url: apiUrl + '/issues/' + $scope.issueId,
        url: apiUrl + '/issues/' + $stateParams.issueId,
        headers: {
            //'x-pagination': '0;20'
        }
    })
    .success(function(issue) {
        $scope.issue = issue;

    });
})

/** CONTROLER affichage de mes ISSUEs **/
/* Controler pour la gestion de     */
/* l'affichage des Issues de la personne logé        */

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

/** CONTROLER RETOURNE UTILISATEURS **/
/* Controler pour le renvoie de 
/* tous les utilisateurs         */
.controller('UsersCtrl', function($scope, $http, apiUrl) {
    $scope.issues = {};
    $http({
        method: 'GET',
        url: apiUrl + '/users',
        headers: {
            'x-pagination': '0;10'
            // pas besoin de setté 'x-user-id' car Auth.js s'en occupe à chaque requête http
            //'x-user-id': AuthService.currentUserId,
        }
    })
    .success(function(issues) {
        $scope.issues = issues;
    });    
})

/** CONTROLER RETOURNE ISSUES TYPE  **/
/* Controler pour le renvoie de 
/* tous les types de Issues         */
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

/** CONTROLER SEARCH ISSUES  **/
/* Controler pour la recherche d'Issues */
/*       */

.controller('SearchCtrl', function($scope, $http, apiUrl, $ionicLoading) {
    /** METHODE filterIssues  **/
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
            'x-pagination': '0;10',          
            },
            data: {
                //'_issueType': '5703a17eaa8d790e00546b94'
                '_issueType': $scope.issueType.id,
                //'_assignee': '5703a17eaa8d790e00546b8f',

                // TO DO : continue filtering criteria
                //'state': 'in_progress'
                // { "tags": { "$in": ["Etiam" ] } }

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

//end
;
