"use strict";

describe("MainCtrl", function() {
  var MainCtrl, scope;

  beforeEach(module("starlight"));

  beforeEach(inject(function($rootScope, $controller) {
    scope = $rootScope.$new();
    MainCtrl = $controller("MainCtrl", {$scope: scope});
  }));

  it("works", function() {
    expect(scope).toBeDefined();
  })
})
