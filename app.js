var app = angular.module('loginapp',['ngRoute','ngMaterial']).config(function($mdIconProvider) {
	$mdIconProvider
	.defaultFontSet('FontAwesome')
	.fontSet('fa', 'FontAwesome');
});

app.config(function($routeProvider){
	$routeProvider.when('/',{
		templateUrl: './components/dashboard.html',
		controller: 'dashCtrl'
	})
	.when('/employee/add',{
		templateUrl: './components/employee/add.html',
		controller: 'addEmployeeCtrl'
	})
	.when('/employee/view',{
		templateUrl: './components/employee/view.html',
		controller: 'viewEmployeeCtrl'
	})
	.when('/employee/viewall',{
		templateUrl: './components/employee/viewall.html',
		controller: 'viewAllEmployeeCtrl'
	})
	.otherwise({
		template: './components/404.html'
	})
});

app.service('EmployeeService', function($http,$q) {
  // we could do additional work here too
  this.allEmployees = [];
  this.getAllEmployees = function(){
  	var delay = $q.defer();
  	$http.get("http://192.168.40.82:5984/customer/europe")
	.then(function(response){
		this.allEmployees = response.data.employees;
		//console.log(this.allEmployees);
		delay.resolve(this.allEmployees);
	},function(error){
		delay.reject("Unable to Fetch");
	});
	return delay.promise;
  };
});

app.controller('viewAllEmployeeCtrl', function($scope,$location,$http,EmployeeService){	
	EmployeeService.getAllEmployees().then(function(employees){
		$scope.employees = employees;
		console.log(employees);
	},function(error){
		console.log(error);
	});
});

app.controller('menuCtrl',function($scope,$location){
	$scope.gotoAddEmployee = function(){
		$location.path('/employee/add');
	};
	$scope.gotoViewEmployee = function(){
		$location.path('/employee/view');
	};
	$scope.gotoViewAllEmployee = function(){
		$location.path('/employee/viewall');
	};
	$scope.gotoDashboard = function(){
		$location.path('/');
	};
});

app.controller('dashCtrl', function($scope,$location){
});

app.controller('addEmployeeCtrl', function($scope,$location,$http){
	var toInsertData = {
		"id": "SHCAT00030",
		"category" : "Perfumes",
		"type" : "shop_category",
		"status" : "active"
	};

	var gpfid = encodeURI("7259601");

	var employeeData = { 
		"id" : gpfid,
		"doctype" : "employee",
		"gpfcpsno":"7259601/GA",
		"type":"GPF",
		"employeename":"Baskaran. M",
		"dob":"1960-05-01",
		"doj":"2010-03-01",
		"dor":"2018-04-30",
		"phone":"9487362978",
		"aadhar":"846412852121",
		"pan":"",
		"nominee":"",
		"lastdrawn":"",
		"status":"0",
		"employeestatus":"6",
		"workingplace":"75",
		"servicedoj":"1970-01-01",
		"designation":"UDRI ",
		"pensionorder":"0",
		"archive":"0",
		"officename":"Taluk Office",
		"taluk":"Denkanikottai",
		"district":"Krishnagiri",
		"admin":"1"
	};

	$scope.data = employeeData;
	$scope.insertData = function insertData(){

		console.log("Saving Data ");
		console.log(employeeData);

		var url = encodeURI('http://localhost:5984/tnpension/'+employeeData.id);

		$http.put(url,employeeData)
		.then(function(succcess,err){
			if(succcess){
				console.log("Saved...........");
			} else{
				console.log(err);
			}
		});	
	};
});

app.controller('viewEmployeeCtrl', function($scope,$location){	
});
