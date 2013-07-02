"use strict";

var app = angular.module("starlight");

app.controller("MainCtrl", function($scope, GitHub) {
  $scope.following = [];

  $scope.getFollowing = function() {
    GitHub.following($scope.user).then(function(results) {
      $scope.following = results;
    })
  }

  $scope.hasFollowing = function() {
    return $scope.following.length > 0;
  }
});
