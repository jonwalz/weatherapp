'use strict';

var app = angular.module('weatherApp', []);

app.controller('myCtrl', ['$scope', 'weatherService', function($scope, weatherService) {
  function fetchWeather(zip) {
    weatherService.getWeather(zip).then(function(data){
      $scope.place = data;
    });
  }

  fetchWeather('97205');

  $scope.findWeather = function(zip) {
    $scope.place = '';
    fetchWeather(zip);
  };
}]);

app.factory('weatherService', ['$http', '$q', function ($http, $q){
  function getWeather (zip) {
    var deferred = $q.defer();
    $http.get('http://api.wunderground.com/api/319c728dc9a4ae57/forecast/geolookup/conditions/q/' + zip + '.json')
      .success(function(data){
        deferred.resolve(data);
      })
      .error(function(err){
        console.log('Error retrieving markets');
        deferred.reject(err);
      });
    return deferred.promise;
  }

  return {
    getWeather: getWeather
  };
}]);


    // http://api.wunderground.com/api/319c728dc9a4ae57/features/settings/q/query.format
