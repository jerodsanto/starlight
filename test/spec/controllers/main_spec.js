"use strict";

describe("MainCtrl", function() {
  var MainCtrl, GitHub, scope;

  beforeEach(module("starlight"));

  beforeEach(inject(function($rootScope, $controller, _GitHub_) {
    scope = $rootScope.$new();
    GitHub = _GitHub_;
    MainCtrl = $controller("MainCtrl", {$scope: scope});
  }));

  describe("#getFollowing", function() {
    it("populates the 'following' model with results from GitHub.following call", inject(function($q) {
      spyOn(GitHub, "following").andCallFake(function() {
        var deferred = $q.defer();
        deferred.resolve([{}, {}]);
        return deferred.promise;
      })

      scope.user = "jerodsanto";
      scope.getFollowing();

      scope.$apply();

      expect(GitHub.following).toHaveBeenCalledWith("jerodsanto");
      expect(scope.following.length).toEqual(2);
    }))
  })
})
