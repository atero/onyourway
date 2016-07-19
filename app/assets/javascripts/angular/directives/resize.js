angular.module("ShopNShip")
  .directive('resize', function($window) {
    return function(scope, element) {
      var w = angular.element($window);
      var changeHeight = function() {
        element.css('min-height', (w.height() - 330) + 'px');
      };
      changeHeight(); // when page loads
    }
  });
