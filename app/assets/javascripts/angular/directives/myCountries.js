App.directive('myCountries', function() {
return {
        restrict: 'E',
        scope: {
          tags: '=',
          type: '=type'
        },
        template:
            '<div class="tags">' +
            '<div ng-repeat="(idx, tag) in tags" class="tag label label-default">{{tag}} <a class="close" href ng-click="remove(idx)">×</a></div>' +
            '</div>' +
            '<div class="input-group"><input type="text" id="Autocomplete" class="form-control" ng-autocomplete="result2" details="details2" options="options2" placeholder="add a country..." ng-model="newValue"/>' +
            '<span class="input-group-btn"><a class="btn btn-default" ng-click="add()">Add</a></span></div>',
        link: function ( $scope, $element ) {
            
          var input = angular.element($element).find('input');

            $scope.result2 = '';
            $scope.options2 = {
              country: 'fr',
              types: '(cities)'
            };    $scope.details2 = '';

          // setup autocomplete
          // if ($scope.autocomplete) {
          //     $scope.autocompleteFocus = function(event, ui) {
          //       input.val(ui.item.value);
          //       return false;
          //     };
          //     $scope.autocompleteSelect = function(event, ui) {
          //       $scope.newValue = ui.item.value;
          //       $scope.$apply( $scope.add );
                
          //       return false;
          //     };
          //     $($element).find('input').autocomplete({
          //           minLength: 0,
          //           source: function(request, response) {
          //             var item;
          //             return response((function() {
          //               var _i, _len, _ref, _results;
          //               _ref = $scope.autocomplete;
          //               _results = [];
          //               for (_i = 0, _len = _ref.length; _i < _len; _i++) {
          //                 item = _ref[_i];
          //                 if (item.toLowerCase().indexOf(request.term.toLowerCase()) !== -1) {
          //                   _results.push(item);
          //                 }
          //               }
          //               return _results;
          //             })());
          //           },
          //           focus: (function(_this) {
          //             return function(event, ui) {
          //               return $scope.autocompleteFocus(event, ui);
          //             };
          //           })(this),
          //           select: (function(_this) {
          //             return function(event, ui) {
          //               return $scope.autocompleteSelect(event, ui);
          //             };
          //           })(this)
          //         });
          //   } 
                  

             // adds the new tag to the array
            $scope.add = function() {
          // if not dupe, add it
          if ($scope.tags.indexOf($scope.newValue)==-1){
                  $scope.tags.push( $scope.newValue );
                }
                $scope.newValue = "";
            };
            
            // remove an item
            $scope.remove = function ( idx ) {
                $scope.tags.splice( idx, 1 );
            };
            
            // capture keypresses
            input.bind( 'keypress', function ( event ) {
                // enter was pressed
                if ( event.keyCode == 13 ) {
                    $scope.$apply( $scope.add );
                }
            });
        }
    };
});
