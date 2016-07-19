App.directive('resize', function($window) {
  return function (scope, element) {
      var w = angular.element($window);
      var changeHeight = function() {element.css('height', (w.height() -330) + 'px' );};
          w.bind('resize', function () {
            changeHeight();   // when window size gets changed
      });
      changeHeight(); // when page loads
  }
});
