App.directive("fileread", [function () {
    return {
        scope: {
            fileread: "="
        },
        link: function (scope, element, attributes) {
            element.bind("change", function (changeEvent) {

                    var FR= new FileReader(); 
                    FR.onloadend = function () {
                        scope.$apply(function () {
                            scope.fileread = FR.result;
                        });
                    }
                    FR.readAsDataURL(changeEvent.target.files[0])
                });
        }
    }
}]);