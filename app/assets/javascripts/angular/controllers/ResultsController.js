App.controller('ResultsCtrl', ['$scope', '$state', "$uibModal", 'localuser', 'orders', 'Shipment', 'Message', function($scope, $state, $uibModal, localuser, orders, Shipment, Message) {
  if (localuser) $scope.inherit.user = localuser;
  $scope.inherit.usertype = 'traveller'

  console.log(orders);

  $scope.local = {
    results: orders
  }


  $scope.search = {
    to: "",
    from: ""
  }
  $scope.filterResults = function() {
    filtered = orders
    if ($scope.search.from && $scope.search.from != "") {
      filtered = filtered.filter(function(d) {
        return d.from.toLowerCase().indexOf($scope.search.from.toLowerCase()) > -1
      })
    }
    if ($scope.search.to && $scope.search.to != "") {
      filtered = filtered.filter(function(d) {
        return d.to.toLowerCase().indexOf($scope.search.to.toLowerCase()) > -1
      })
    }
    return filtered
  }

  newShipments = function(shipment, result) {
		console.log(result);
    $scope.inherit.loading = true;
    console.log($scope.inherit.user)
    shipment.to = shipment.to.address_components[0].long_name;
    shipment.from = shipment.from.address_components[0].long_name;
    Shipment.create({
      id: shipment.order_id,
      token: $scope.inherit.user.token
    }, {
      shipment: shipment
    }, function(res) {
			
    })

  }

  $scope.propose = function(type, result) {

    var modalInstance = $uibModal.open({
      animation: $scope.animationsEnabled,
      templateUrl: 'templateModal.html',
      controller: 'ModalCtrl',
      size: "md",
      resolve: {
        order_id: function() {
          return result.id;
        }
      }
    });

    modalInstance.result.then(function(shipment) {
      if (shipment) {
        if (!$scope.inherit.user) {
          $scope.inherit.openSignin().then(function(res) {
            newShipments(shipment, result)
          });
        } else {
          newShipments(shipment, result)
        }
      }
    })
  }





}]);
