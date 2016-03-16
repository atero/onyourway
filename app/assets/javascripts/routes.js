window.App.config(['$stateProvider', '$urlRouterProvider',
  function($stateProvider, $urlRouterProvider) {

    $urlRouterProvider.otherwise("/");

    $stateProvider
     .state('welcome', {
        url:'/',
        templateUrl: "templateWelcome.html",
        controller: 'WelcomeCtrl'
    })

    $stateProvider
     .state('results', {
        url:'/results',
        templateUrl: "templateResults.html",
        controller: 'ResultsCtrl'
    })

    $stateProvider
     .state('create', {
        url:'/create',
        templateUrl: "templateCreate.html",
        controller: 'CreateCtrl'
      })

}]);
