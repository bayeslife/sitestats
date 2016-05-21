'use strict';

describe('Service: probability', function () {

  // load the service's module
  beforeEach(module('webdata2App'));

  // instantiate service
  var probability;
  beforeEach(inject(function (_probability_) {
    probability = _probability_;
  }));

  it('should do something', function () {
    expect(!!probability).toBe(true);
  });

});
