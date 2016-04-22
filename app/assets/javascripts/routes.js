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
          }],
          orders:['$q', 'Auth', 'Order', function($q, Auth, Order){
                var d = $q.defer();
                var orders = Order.index({}, function(res){
                  d.resolve(res);
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
                  console.log(user)
                  d.resolve(user);
                }, function(error) {
                  d.resolve(null);
                });
                return d.promise;
          }]
        }
      })

    $stateProvider
     .state('profile', {
        url:'/profile',
        templateUrl: "templateProfile.html",
        controller: 'ProfileCtrl',
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
     .state('orders', {
        url:'/orders',
        templateUrl: "templateOrders.html",
        controller: 'OrdersCtrl',
        resolve: {
          localuser:['$q', 'Auth', function($q, Auth){
                var d = $q.defer();
                var user = Auth.currentUser().then(function(user){
                  d.resolve(user);
                }, function(error) {
                  d.resolve(null);
                });
                return d.promise;
          }],
          orders:['$q', 'Auth', 'Order', 'localuser', function($q, Auth, Order, localuser){
                var d = $q.defer();
                var orders = Order.list({id: localuser._id}, function(res){
                  d.resolve(res);
                }, function(error) {
                  d.resolve(null);
                });
                return d.promise;
          }]
        },
      })  

    $stateProvider
     .state('shipments', {
        url:'/shipments',
        templateUrl: "templateShipments.html",
        controller: 'ShipmentsCtrl',
        resolve: {
          localuser:['$q', 'Auth', function($q, Auth){
                var d = $q.defer();
                var user = Auth.currentUser().then(function(user){
                  d.resolve(user);
                }, function(error) {
                  d.resolve(null);
                });
                return d.promise;
          }],
          shipments:['$q', 'Auth', 'Shipment', 'localuser', function($q, Auth, Shipment, localuser){
                var d = $q.defer();
                var shipments = Shipment.list({}, function(res){
                  d.resolve(res);
                }, function(error) {
                  d.resolve(null);
                });
                return d.promise;
          }]
        }
      })  
}]);
