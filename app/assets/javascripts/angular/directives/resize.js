App
  .directive('resize', ['$window', function($window) {
    return function(scope, element) {
      var w = angular.element($window);
      var changeHeight = function() {
        element.css('min-height', (w.height() - 322) + 'px');
      };
      changeHeight(); // when page loads
    }
  }]);
