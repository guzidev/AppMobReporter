angular.module('citizen-engagement.controllers', [])

        .controller('UserController', function($scope) {
           $scope.data = [
			{ firstName: "John", lastName: "Doe" },
			{ firstName: "John", lastName: "Smith" },
			{ firstName: "David", lastName: "Lowe" },
			{ firstName: "Mark", lastName: "Holloway" }
		]; 
})
