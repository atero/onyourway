App.controller('OrdersCtrl', ['$scope', '$state', 'localuser', 'orders', 'Shipment', 'Order', 'Message', "$uibModal", function($scope, $state, localuser, orders, Shipment, Order, Message, $uibModal) {

  if (localuser) $scope.inherit.user = localuser;
  ga('set', 'page', '/orders');
  ga('send', 'pageview');

  $scope.local = {
    orders: orders,
    conversation_shipment: null
  }

  if (orders && orders.length > 0) {
    $scope.local.data_to_show = orders[0];
    if ($scope.local.data_to_show.shipments) {
      if ($scope.local.data_to_show.shipments.length > 0) {
        $scope.local.conversation_shipment = $scope.local.data_to_show.shipments[0];
      }
    }
  }


  console.log($scope.local.orders);



  $scope.accept_travel = function(order, shipment) {

    order.accepted_shipment = shipment.id;
    shipment.status = "accepted-" + order.id;
    console.log(';;;;;;;;;;;;;;;;;;;;;;;;;;;;;');
    console.log(order);
    console.log(shipment);
    console.log(';;;;;;;;;;;;;;;;;;;;;;;;;;');
    var modalInstance = $uibModal.open({
      animation: $scope.animationsEnabled,
      templateUrl: 'templateStripe.html',
      controller: 'StripeCtrl',
      size: "md",
      resolve: {
        payment_details: function() {
          return {
            customer_name: $scope.inherit.user.first_name + ' ' + $scope.inherit.user.last_name,
            order: order,
            shipment: shipment
          };
        }
      }
    });

    modalInstance.result.then(function(shipment) {

      order.accepted_shipment = shipment.id;
      order.status = "accepted"
      console.log('8********************************');
      $scope.local.conversation_shipment = shipment;
      // Shipment.update({
      //   id: shipment.id
      // }, {
      //   shipment: shipment
      // }, function(res) {
      //   // some callback if needed
      // });
      // Order.update({
      //   id: order.id
      // }, {
      //   order: order
      // }, function(res) {
      //
      // })
      console.log('pay');
    })

  }

  $scope.refuse_travel = function(order, shipment) {

    swal({
      title: 'Are you sure you want to delete this delivery offer from the list?',
      text: "You won't be able to see it anymore.",
      type: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Delete it',
      imageUrl: "images/icon-delete.png"
    }, function(isConfirm) {
      if (isConfirm) {
        //shipment.status = "refused"
        if(!!shipment.refuses){
          console.log('adding refuse');
          shipment.refuses.push(order.id);
        }
        else{
          console.log('create refuse');
          shipment.refuses = [order.id];
        }
        Shipment.update({
          id: shipment.id
        }, {
               shipment: shipment,
               order_id: order.id
        })
      }
    })
  }

  $scope.setOrder = function(order) {
    $scope.local.conversation_shipment = null;
    $scope.local.data_to_show = order;
    console.log('data to show');
    console.log($scope.local.data_to_show);
    if ($scope.local.data_to_show.accepted_shipment != 'false') {
      $scope.local.conversation_shipment = $scope.local.data_to_show.shipments.filter(function(d) {
        return d.id == order.accepted_shipment;
      })[0]
    }
    if ($scope.local.data_to_show.shipments){
      if($scope.local.data_to_show.shipments.length > 0) {
        var refused = 0;
        var similar = 0;
        for (var i = 0; i < $scope.local.data_to_show.shipments.length; i++) {
          if ($scope.local.data_to_show.shipments[i].refuses) {
            for (var j = 0; j < $scope.local.data_to_show.shipments[i].refuses.length; j++) {
              if ($scope.local.data_to_show.shipments[i].refuses[j] == $scope.local.data_to_show .id) {
                  refused++;
              }
            }
            for (var m = 0; m < $scope.local.data_to_show.shipments[i].refuses.length; m++) {
              var item = $scope.local.data_to_show.shipments[i].refuses[m];
              for (var n = m+1; n < $scope.local.data_to_show.shipments[i].refuses.length; n++) {
                if (item == $scope.local.data_to_show.shipments[i].refuses[n] ) {
                    similar++;
                }
              }
            }
          }
        }
           $scope.count_offer = $scope.local.data_to_show.shipments.length - (refused - similar);
        }
      }
  }

  $scope.sendMessage = function(order, shipment) {
    message = {
      text: $scope.local.new_message.text,
      sender: $scope.inherit.user._id,
      recipient: shipment.user.id
    }

    console.log(shipment);

    $scope.inherit.loading = true
    Message.create({
      shipment_id: shipment.id,
      order_id: order.id
    }, {
      message: message
    }, function(res) {
      $scope.inherit.loading = false;
      shipment.messages.push(res);
      $scope.local.new_message.text = '';
    })

  }

}]);
