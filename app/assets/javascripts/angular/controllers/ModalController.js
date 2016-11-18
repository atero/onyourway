App.controller('ModalCtrl', ['$scope', '$uibModalInstance', "order_id", function($scope, $uibModalInstance, order_id) {
  $scope.local = {
    shipment: {
      order_id: order_id,
      from: null,
      to: null
    }
  }
  $scope.with_order = true;
  if (order_id == 'noid') {
    $scope.with_order = false;
  }
  $scope.ok = function(isValid) {
    if (isValid) {
      if ($scope.local.validated) {
        $scope.local.loading = true;
        $uibModalInstance.close($scope.local.shipment);
        $scope.local.loading = false
      } else {
        $scope.local.validated = true
      }
    } else {
      $('.ng-invalid').addClass('error');
      $('.ng-valid').removeClass('error');
    }
  }

  $scope.cancel = function() {
    if ($scope.local.validated) {
      $scope.local.validated = false
    } else {
      $uibModalInstance.close()
    }
  }

  $scope.countrylist = countrylist

  $scope.local.result = '';

  $scope.local.options = {
    country: '',
    types: '(cities)'
  };

  $scope.local.details = '';

}]);

App.controller('LoginCtrl', ['$scope', '$uibModalInstance', 'type', function($scope, $uibModalInstance, type) {

  $scope.local = {
    type: type
  }

  $scope.signin = function() {
    $uibModalInstance.close($scope.local)
  }

  $scope.signup = function(isValid) {
    if (isValid) {
      $uibModalInstance.close($scope.local)
      fbq('track', 'CompleteRegistration');
    }

  }

  $scope.change_type = function() {
    $scope.local.type = ($scope.local.type == "signin") ? "signup" : "signin"
  }
}]);

App.controller('ContactCtrl', ['$scope', '$uibModalInstance', 'Message', function($scope, $uibModalInstance, Message) {

  $('#contact-opacity').on('click', function() {
    $('.modal').css({
      "background-color": "rgba(0,0,0,0.4)",
      "margin-top": "55px"
    });
  });

  $scope.contact = {};

  $scope.sendContactMessage = function(isValid) {
  if(isValid){
      $uibModalInstance.close($scope.contact)
    }else {
      if (!($('#contact_name').val()) > 0) {
        $('#contact_name').addClass('error');
      }else {
        $('#contact_name').removeClass('error');
      }
      if (!($('#contact_mail').val()) > 0) {
          $('#contact_mail').addClass('error');
      }else {
        $('#contact_mail').removeClass('error');
      }
      if (!($('#textarea_contact').val()) > 0) {
        $('#textarea_contact').addClass('error');
      }else {
        $('#textarea_contact').removeClass('error');
      }
    }
  }


  $scope.cancelContact = function() {
    $uibModalInstance.dismiss('cancel');
  }
}]);
