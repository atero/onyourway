App.factory('Order',['$resource',function($resource){

	return $resource(api_endpoint+'orders/:id/', {id:'@id'},
	{
		create: { method:"POST", params: {}, isArray : false },
		index: { method:"GET", params: {}, isArray : true },
		list: { method:"GET", params: {id :'@id'}, isArray : true }

	});
}]);

App.factory('Shipment',['$resource',function($resource){

	return $resource(api_endpoint+'shipments/:id/', {id:'@id'},
	{
		create: { method:"POST", params: {id :'@id'}, isArray : false },
		list: { method:"GET", params: {}, isArray : true },
		update: {method: "PUT", params:{id : '@id'}, isArray : false}
	});
}]);

App.factory('Message',['$resource',function($resource){

	return $resource(api_endpoint+'messages/:shipment_id/', {shipment_id:'@shipment_id'},
	{
		create: { method:"POST", params: {shipment_id :'@shipment_id'}, isArray : false },
		index: { method:"GET", params: {shipment_id :'@shipment_id'}, isArray : true }
	});
}]);


// App.factory('User',['$resource',function($resource){
//
// 	return $resource(api_endpoint+'v1/users/:id/', {id:'@id'},
// 	{
// 		show: { method:"GET", params: {id :'@id'}, isArray : false },
// 		index: { method:"GET", params: {}, isArray : true },
// 		create: { method:"POST", params: {}, isArray : false },
// 		update: { method:"PUT", params: {id :'@id'}, isArray : false }
// 	});
//
// }]);
