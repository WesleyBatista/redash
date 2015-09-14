(function () {

  var UsersCtrl = function ($scope, $log, $q, User) {

    var updateSmartTable = function(){

       if($scope.selectedTab.key == "orphans"){
        $scope.users = $scope.orphanUsers;
       }else{
        $scope.users = $scope.allUsers;
       };

    };

    $scope.allUsers = [];
    $scope.orphanUsers = [];
    $scope.users = [];


    $scope.gridConfig = {
      isPaginationEnabled: true,
      itemsByPage: 50,
      maxSize: 8,
    };


    $scope.gridColumns = [
      {
        "label": "Name",
        "map": "name",
        "cellTemplate": '<a href="/users/{{dataRow.id}}">{{dataRow.name}}</a>'
      },
      {
        'label': 'Email',
        'cellTemplate': '{{dataRow.email}}'
      },
      {
        'label': 'Countries',
        'cellTemplate': '{{dataRow.countries}}'
      },
      {
        'label': 'Created At',
        'cellTemplate': '<span am-time-ago="dataRow.created_at"></span>'
      },
      {
        'label': 'Updated At',
        'cellTemplate': '<span am-time-ago="dataRow.updated_at"></span>'
      },
      {
        'label': 'Status',
        'cellTemplate': '{{dataRow.status}}'
      }
    ];


    $scope.tabs = [
      {"key": "!", "name": "Users"},
      {"key": "orphans", "name": "Orphans"}
    ];



    allUsersPromise = User.getAll().$promise;
    orphanUsersPromise = User.getOrphans().$promise;

    $q.all([allUsersPromise, orphanUsersPromise]).then(function(results){
      $scope.allUsers = results[0];
      $scope.orphanUsers = results[1];


      $scope.$watch('selectedTab', function (tab) {
        if (tab) {
          $scope.$parent.pageTitle = tab.name;
        };

        if (!$scope.selectedTab) {
          return false;
        }

        updateSmartTable();

      });
    });


  };

  var UserCtrl = function ($scope, $routeParams, $location, $log, $filter, growl, Events, User, AreasResource) {

    $scope.$parent.pageTitle = "Users";
    $scope.userId = $routeParams.userId;
    $scope.areasChoices = [];

    currentUserCountries = [];

    AreasResource.getCurrentUserCountries().then(function(countries){
      currentUserCountries = countries;
      AreasResource.getCountriesList(currentUserCountries).then(function(countriesList){
        $scope.areasChoices = countriesList;
      });
    });

    if ($scope.userId === "new") {
      Events.record(currentUser, 'view', 'page', 'users/new');
      $scope.user = new User({options: {}});
      $log.debug($scope.countries);

    } else {
      Events.record(currentUser, 'view', 'user', $scope.userId);
      $scope.user = User.get({id: $scope.userId}, function(user) {

        AreasResource.getCountriesList(user.countries).then(function(countriesList){
          $scope.user.countries = countriesList;
        });

      });
    }


    $scope.saveChanges = function() {
      if ($scope.user.name === undefined || $scope.user.name === '') {
        // $scope.user.name = $scope.getDefaultName();
      }

      $scope.user.$save(function(user) {

        growl.addSuccessMessage("Saved.");

        if ($scope.userId === "new") {
           $location.path('/users/' + user.id).replace();
        } else {

          // CODE FOR SINGLE COUNTRY
          $scope.user = User.get({id: $scope.userId}, function(user){
            AreasResource.getCountriesList(user.countries).then(function(countriesList){
              $scope.user.countries = countriesList[0];
            });
          });
          // END

        }

        $location.path("/users");

      }, function(e) {
        growl.addErrorMessage("Failed saving user.");
      });
    };


  };

  angular.module('redash.controllers')
    .controller('UsersCtrl', ['$scope', '$log', '$q', 'User', UsersCtrl])
    .controller('UserCtrl', ['$scope', '$routeParams', '$location', '$log', '$filter', 'growl', 'Events', 'User', 'AreasResource', UserCtrl])
})();
