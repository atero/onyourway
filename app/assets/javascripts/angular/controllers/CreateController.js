App.controller('CreateCtrl', ['$scope', '$state', 'localuser', 'Order', 'Shipment', function($scope, $state, localuser, Order, Shipment) {
  if (localuser) $scope.inherit.user = localuser;
  $scope.inherit.loading = false;
  $scope.local = {
    order: {
      from: [],
      to: "",
      base64_image: null,
      message: "",
      price: 0,
      reward: 0,
      total_price: 0,
      quantity: 1
    },
    shipment: {
      from: "",
      to: "",
      date: new Date(),
      message: ""
    }
  }

  $scope.toOptions = {
    types: ['(cities)'],
  }
  $scope.fromOptions = {

  }

  newOrder = function() {
    if (!!$scope.local.order.from.address_components) {
      $scope.local.order.from = $scope.local.order.from.address_components[0].long_name;
    } else {
      $scope.local.order.from = "Anywhere";
    }

    $scope.local.order.to = $scope.local.order.to.address_components[0].long_name;
    $scope.inherit.loading = true;
    $scope.local.order.total_price = ($scope.local.order.reward + $scope.local.order.price * $scope.local.order.quantity) * 1.07 + 6
    Order.create({
      token: $scope.inherit.user.token
    }, {
      order: $scope.local.order
    }, function(res) {
      $scope.inherit.loading = false;
      $scope.inherit.goState('orders');
    })
  }

  newShipment = function() {
    $scope.inherit.loading = true;

    console.log("$scope.local.shipment");
    console.log($scope.local.shipment);
    Shipment.create({
      token: $scope.inherit.user.token
    }, {
      shipment: $scope.local.shipment
    }, function(res) {
      $scope.inherit.loading = false;
      $scope.inherit.goState('shipments');
    })
  }

  if ($scope.inherit.usertype == "shopper") {
    $scope.local.stages = [true, false, false, false]
  } else {
    $scope.local.stages = [true]
  }



  $scope.stepForward = function() {



    curr_stage = $scope.local.stages.indexOf(true)
    console.log(curr_stage);
    if (curr_stage != 2) {
      $scope.local.stages[curr_stage] = false
      $scope.local.stages[curr_stage + 1] = true;
      jQuery('#price, #reward, #quantity').focus(function(){
        if($(this).val() == 0){
          $(this).val('');
        }
      });

      jQuery('#price, #reward, #quantity').blur(function(){
        if($(this).val()== ''){
          $(this).val(0);
        }
      });
    }

    if (curr_stage == 2) {

      if (jQuery('#price').val() > 0 && jQuery('#reward').val() > 0 && jQuery('#quantity').val() > 0) {
        jQuery('#price, #reward, #quantity').removeClass('error');
        $scope.local.stages[curr_stage] = false
        $scope.local.stages[curr_stage + 1] = true;
      } else
      {
        if (!(jQuery('#price').val() > 0)) {
          jQuery('#price').addClass('error');
        }
        else{
          jQuery('#price').removeClass('error');
        }
        if (!(jQuery('#reward').val() > 0)) {
          jQuery('#reward').addClass('error');
        }else{
          jQuery('#reward').removeClass('error');
        }
        if (!(jQuery('#quantity').val() > 0)) {
          jQuery('#quantity').addClass('error');
        }else{
          jQuery('#quantity').removeClass('error');
        }
      }
    }
  }

  $scope.stepBack = function() {
    curr_stage = $scope.local.stages.indexOf(true)
    $scope.local.stages[curr_stage] = false
    $scope.local.stages[curr_stage - 1] = true
  }
  $scope.publishOrder = function() {
    if (!$scope.inherit.user) {
      $scope.inherit.openSignin().then(function(res) {
        newOrder()
      });
    } else {
      newOrder()
    }
  }
  $scope.publishShipment = function() {
    if (!$scope.inherit.user) $scope.inherit.openSignin().then(function(res) {
      newShipment()
    });
    else newShipment()
  }

}]);
