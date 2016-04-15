window.App.config(['$stateProvider', '$urlRouterProvider',
  function($stateProvider, $urlRouterProvider) {

    $urlRouterProvider.otherwise("/");

    $stateProvider
     .state('welcome', {
        url:'/',
        templateUrl: "templateWelcome.html",
        controller: 'WelcomeCtrl',
        resolve: {
          localuser:['$q', 'Auth', function($q, Auth){
                var d = $q.defer();
                var user = Auth.currentUser().then(function(user){
                  d.resolve(user);
                }, function(error) {
                  d.resolve(null);
                });
                return d.promise;
          }]
        }
    })

    $stateProvider
     .state('results', {
        url:'/results',
        templateUrl: "templateResults.html",
        controller: 'ResultsCtrl',
        resolve: {
          localuser:['$q', 'Auth', function($q, Auth){
                var d = $q.defer();
                var user = Auth.currentUser().then(function(user){
                  d.resolve(user);
                }, function(error) {
                  d.resolve(null);
                });
                return d.promise;
          }]
        }
    })

    $stateProvider
     .state('create', {
        url:'/create',
        templateUrl: "templateCreate.html",
        controller: 'CreateCtrl',
        resolve: {
          localuser:['$q', 'Auth', function($q, Auth){
                var d = $q.defer();
                var user = Auth.currentUser().then(function(user){
                  d.resolve(user);
                }, function(error) {
                  d.resolve(null);
                });
                return d.promise;
          }]
        }
      })

}]);
