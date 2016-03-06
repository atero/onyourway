
// App.factory('Task',['$resource',function($resource){

// 	return $resource(api_endpoint+'v1/tasks/user/:user_id/:id/', {id:'@id', user_id:'@user_id'},
// 	{
// 		show: { method:"GET", params: {id :'@id', user_id:'@user_id'}, isArray : false },
// 		index: { method:"GET", params: {user_id:'@user_id'}, isArray : true },
// 		create: { method:"POST", params: {user_id:'@user_id'}, isArray : false },
// 		update: { method:"PUT", params: {id :'@id', user_id:'@user_id'}, isArray : false },
// 		destroy: { method:"DELETE", params: {id :'@id', user_id:'@user_id'}, isArray : false }
// 	});
// }]);

// App.factory('User',['$resource',function($resource){
	
// 	return $resource(api_endpoint+'v1/users/:id/', {id:'@id'},
// 	{
// 		show: { method:"GET", params: {id :'@id'}, isArray : false },
// 		index: { method:"GET", params: {}, isArray : true },
// 		create: { method:"POST", params: {}, isArray : false },
// 		update: { method:"PUT", params: {id :'@id'}, isArray : false }
// 	});

// }]);

