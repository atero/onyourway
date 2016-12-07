window.App.config(['$stateProvider', '$urlRouterProvider','$locationProvider', 'ngMetaProvider', 'ngMeta',
  function($stateProvider, $urlRouterProvider, $locationProvider, ngMeta, ngMetaProvider ) {
    $urlRouterProvider.otherwise("/");
    $stateProvider.decorator('data', ngMetaProvider.mergeNestedStateData);

    $stateProvider
      .state('welcome', {
        url: '/',
        templateUrl: "templateWelcome.html",
        controller: 'WelcomeCtrl',
        data:{
         meta:{
           title: "Buy overseas brands in Lebanon including Apple, Amazon and Ebay. International delivery offered by travelers coming your way.",
           description: "With On Your Way you can shop items from anywhere in the world or get paid to deliver them on your travels. Join us!",
           "og:type": "website",
           "og:site_name": "On Your Way",
           "og:title": "Join On Your Way to shop items from anywhere in the world!",
           "og:description": "Use On Your Way to shop items from anywhere in the world. A trusted traveler can bring them to via our secure p2p delivery platform.",
           "og:url": "https://www.onyourway.io/",
           "og:image": ""
         }
       },
        resolve: {
          localuser: ['$q', 'Auth', function($q, Auth) {
            var d = $q.defer();
            var user = Auth.currentUser().then(function(user) {
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
        url: '/shop',
        templateUrl: "templateResults.html",
        controller: 'ResultsCtrl',
        data:{
         meta:{
           title: "On Your Way: shop US &amp; European Brands | P2P Delivery to Lebanon.",
           description: "Shop overseas brands including Apple, Amazon and Ebay.International delivery offered by travelers coming your way.",
           "og:type": "website",
           "og:site_name": "On Your Way",
           "og:title": "Shop US &amp; European Brands | P2P Delivery to Lebanon.",
           "og:description": "Shop overseas brands including Apple, Amazon and Ebay. International delivery offered by travelers coming your way.",
           "og:url": "https://www.onyourway.io/shop",
           "og:image": ""
         }
       },
        resolve: {
          localuser: ['$q', 'Auth', function($q, Auth) {
            var d = $q.defer();
            var user = Auth.currentUser().then(function(user) {
              d.resolve(user);
            }, function(error) {
              d.resolve(null);
            });
            return d.promise;
          }],
          orders: ['$q', 'Auth', 'Order', function($q, Auth, Order) {
            var d = $q.defer();
            var orders = Order.index({}, function(res) {
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
        url: '/create',
        templateUrl: "templateCreate.html",
        controller: 'CreateCtrl',
        resolve: {
          localuser: ['$q', 'Auth', function($q, Auth) {
            var d = $q.defer();
            var user = Auth.currentUser().then(function(user) {
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
      .state('faq', {
        url: '/faq',
        controller: 'FaqCtrl',
        templateUrl: "templateFaq.html",
        data:{
         meta:{
           title: "FAQ online shopping and delivery to Lebanon",
           description: "Questions about shopping items from around the world. What can I buy in Lebanon?",
           "og:type": "website",
           "og:site_name": "On Your Way",
           "og:title": "FAQ",
           "og:description": "Questions about shopping items from around the world. What can I buy in Lebanon?",
           "og:url": "https://www.onyourway.io/faq",
           "og:image": ""
         }
       },
        resolve: {
          localuser: ['$q', 'Auth', function($q, Auth) {
            var d = $q.defer();
            var user = Auth.currentUser().then(function(user) {
              d.resolve(user);
            }, function(error) {
              d.resolve(null);
            });
            return d.promise;
          }]
        }
      })
    $stateProvider
      .state('conditions', {
        url: '/conditions',
        controller: 'ConditionsCtrl',
        templateUrl: "templateConditions.html",
        resolve: {
          localuser: ['$q', 'Auth', function($q, Auth) {
            var d = $q.defer();
            var user = Auth.currentUser().then(function(user) {
              d.resolve(user);
            }, function(error) {
              d.resolve(null);
            });
            return d.promise;
          }]
        }
      })
      $stateProvider
        .state('about', {
          url: '/about',
          controller: 'AboutCtrl',
          templateUrl: "templateAbout.html",
          data:{
           meta:{
             title: "About On Your Way",
             description: "A better way to shop and travel the world.",
             "og:type": "website",
             "og:site_name": "On Your Way",
             "og:title": "About",
             "og:description": "!",
             "og:url": "https://www.onyourway.io/about",
             "og:image": "A better way to shop and travel the world."
           }
         },
          resolve: {
            localuser: ['$q', 'Auth', function($q, Auth) {
              var d = $q.defer();
              var user = Auth.currentUser().then(function(user) {
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
        url: '/profile',
        templateUrl: "templateProfile.html",
        controller: 'ProfileCtrl',
        resolve: {
          localuser: ['$q', 'Auth', function($q, Auth) {
            var d = $q.defer();
            var user = Auth.currentUser().then(function(user) {
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
        url: '/orders',
        templateUrl: "templateOrders.html",
        controller: 'OrdersCtrl',
        resolve: {
          localuser: ['$q', 'Auth', function($q, Auth) {
            var d = $q.defer();
            var user = Auth.currentUser().then(function(user) {
              d.resolve(user);
            }, function(error) {
              d.resolve(null);
            });
            return d.promise;
          }],
          orders: ['$q', 'Auth', 'Order', 'localuser', function($q, Auth, Order, localuser) {
            var d = $q.defer();
            var orders = Order.list({
              id: localuser._id
            }, function(res) {
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
        url: '/travel',
        templateUrl: "templateShipments.html",
        controller: 'ShipmentsCtrl',
        data:{
         meta:{
           title: "Travel to Lebanon and Earn Money",
           description: "Traveling to Lebanon or Turkey? Earn money and meet new people each time you travel.",
           "og:type": "website",
           "og:site_name": "On Your Way",
           "og:title": "Travel and Earn Money",
           "og:description": "Traveling to Lebanon or Turkey? Earn money and meet new people each time you travel.",
           "og:url": "https://www.onyourway.io/travel",
           "og:image": ""
         }
       },
        resolve: {
          localuser: ['$q', 'Auth', function($q, Auth) {
            var d = $q.defer();
            var user = Auth.currentUser().then(function(user) {
              d.resolve(user);
            }, function(error) {
              d.resolve(null);
            });
            return d.promise;
          }],
          shipments: ['$q', 'Auth', 'Shipment', 'localuser', function($q, Auth, Shipment, localuser) {
            var d = $q.defer();
            var shipments = Shipment.list({}, function(res) {
              d.resolve(res);
            }, function(error) {
              d.resolve(null);
            });
            return d.promise;
          }]
        }
      })

    $stateProvider
      .state('payout', {
        url: '/payout',
        templateUrl: "templatePayout.html",
        controller: 'PayoutCtrl',
        resolve: {
          localuser: ['$q', 'Auth', function($q, Auth) {
            var d = $q.defer();
            var user = Auth.currentUser().then(function(user) {
              d.resolve(user);
            }, function(error) {
              d.resolve(null);
            });
            return d.promise;
          }],
          shipments: ['$q', 'Auth', 'Shipment', 'localuser', function($q, Auth, Shipment, localuser) {
            var d = $q.defer();
            var shipments = Shipment.list({}, function(res) {
              d.resolve(res);
            }, function(error) {
              d.resolve(null);
            });
            return d.promise;
          }]
        }
      })
      $locationProvider.html5Mode(true);

  }
])
.run(['ngMeta', function(ngMeta) {
  ngMeta.init();
}]);
