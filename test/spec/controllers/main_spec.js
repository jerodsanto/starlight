"use strict";

describe("MainCtrl", function() {
  var MainCtrl, GitHub, scope;

  beforeEach(module("starlight"));

  beforeEach(inject(function($rootScope, $controller, _GitHub_) {
    scope = $rootScope.$new();
    GitHub = _GitHub_;
    MainCtrl = $controller("MainCtrl", {$scope: scope});
  }));

  describe("initialization", function() {
    it("sets model defaults", function() {
      expect(scope.following).toEqual([]);
      expect(scope.stars).toEqual([]);
    })
  })

  describe("#getFollowing", function() {
    it("populates the 'following' model with results from GitHub.following call", inject(function($q) {
      var ladda = jasmine.createSpyObj("ladda", ["start", "stop"]);

      spyOn(Ladda, "create").andReturn(ladda);

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

  describe("#hasAny", function() {
    it("is true when 'modelName' has items", function() {
      scope.stars = [{}];
      expect(scope.hasAny("stars")).toEqual(true);
    })

    it("is false when 'modelName' doesn't have any items", function() {
      scope.following = [];
      expect(scope.hasAny("following")).toEqual(false);
    })
  })

  describe("#getStars", function() {
    it("populates the 'stars' model with results from GitHub.stars call", inject(function($q) {
      spyOn(GitHub, "stars").andCallFake(function() {
        var deferred = $q.defer();
        deferred.resolve([{}, {}, {}]);
        return deferred.promise;
      })

      scope.getStars("jerodsanto");

      scope.$apply();

      expect(GitHub.stars).toHaveBeenCalledWith("jerodsanto");
      expect(scope.stars.length).toEqual(3);
    }))
  })
})
