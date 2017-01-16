var app = angular.module('topshelf', [])

app.controller('MainCtrl', [
'$scope','$http','$location',
function($scope , $http, $location){
  var Mydata = {};
  $http.get("http://localhost:8080/inventory").success(function(data,status,header,config){
    $scope.Mydata = data;
  });

  $scope.delete = function(name) {
  	var url = "http://localhost:8080/ingredients/" + name;
  	$http.delete(url).success(function(err,data){
  		if (err){console.log(err);}
  		$scope.Mydata = data;
  	});
  }

  $scope.edit = function(name,qty){
    $scope.ingr = name;
    $scope.qty = qty;
    /*var url = "http://localhost:8080/ingredients/" + name;
    $http.put(url).success(function(err,data){
      if (err) {console.log(err);}
      $scope.Mydata = data;
    })*/;
  }

  $scope.send = function(ingr){
    console.log(ingr);
    console.log($scope.qty);
    $http(
      {
        url: "http://localhost:8080/ingredients/"+ingr,
        method: "PUT",
        data: $.param({
          "quantity": 17
        }),
        headers: {
          'Content-Type' : 'application/json'
        }
      }).then(function(res){
      console.log(res);
    },function(r){
      console.error(r);
    }
    );
  }

  $scope.editProduct = function(name,qty){
    $location.search('name', name);
    $location.search('quantity' , qty);
    $http.get("http://localhost:8080/ingredients/edit")
  }
}]);