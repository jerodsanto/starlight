"use strict";

var app = angular.module("starlight");

app.service("GitHub", function($http) {
  this.jsonPUrl = function(endpoint) {
    return "https://api.github.com/" + endpoint + "?callback=JSON_CALLBACK";
  }

  this.following = function(login) {
    var url = this.jsonPUrl("users/" + login + "/following");

    return $http.jsonp(url).then(function(response) {
      return response.data.data;
    });
  }

  this.stars = function(login) {
    return [];
  }
})
