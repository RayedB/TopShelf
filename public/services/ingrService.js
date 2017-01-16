angular.module('topshelf').factory('ingrService', Service);

Service.$inject = ['$http','globalConfig'];

function Service($http, globalConfig) {
 var url = "";
 return {
 	delete: function(id) {
 		url = globalConfig.apiAddress + "/ingredients/" + id;
 		return $http.delete(url);
 	}