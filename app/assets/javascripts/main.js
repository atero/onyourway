window.App = angular.module("ShopNShip", ['google.places', 'ngResource','ui.router','ui.bootstrap','Devise','ngRoute','templates','ngSanitize','ngCsv','ngAnimate','oitozero.ngSweetAlert','mwl.calendar','angularFileUpload', 'ngMeta'])
  .run(['ngMeta', function(ngMeta) {
    ngMeta.init();
  }]);
