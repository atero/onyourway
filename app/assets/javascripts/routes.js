window.App.config(['$stateProvider', '$urlRouterProvider',
  function($stateProvider, $urlRouterProvider) {

    $urlRouterProvider.otherwise("/");

    $stateProvider
     .state('welcome', {
        url:'/',
        templateUrl: "templateWelcome.html",
        controller: 'WelcomeCtrl'
    })

    // $stateProvider
    //  .state('login', {
    //     url:'/login',
    //     templateUrl: "templateLogin.html",
    //     controller: 'LoginCtrl'
    // })


}]);
