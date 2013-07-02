"use strict";

describe("GitHub", function() {
  var http, GitHub;

  beforeEach(module("starlight"));

  beforeEach(inject(function($httpBackend, _GitHub_) {
    http = $httpBackend;
    GitHub = _GitHub_;
  }))

  afterEach(function() {
    http.verifyNoOutstandingExpectation();
    http.verifyNoOutstandingRequest();
  })

  describe(".following", function() {
    it("queries the GitHub API and returns the response objects", function() {
      var api = "https://api.github.com/users/jerodsanto/following?callback=JSON_CALLBACK";
      var results;

      http.expectJSONP(api).respond({
        meta: {},
        data: [{}, {}]
      });

      GitHub.following("jerodsanto").then(function(users) {
        results = users;
      });

      http.flush();
      expect(results.length).toEqual(2);
    })
  })

  describe(".stars", function() {
    it("queries the GitHub API and returns response data objects", function() {
      var api = "https://api.github.com/users/jerodsanto/starred?callback=JSON_CALLBACK";
      var results;

      http.expectJSONP(api).respond({
        meta: {},
        data: [{}, {}, {}]
      })

      GitHub.stars("jerodsanto").then(function(repos) {
        results = repos;
      })

      http.flush();
      expect(results.length).toEqual(3);
    })
  })
})
