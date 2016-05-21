'use strict';

describe('Service: distributionview', function () {

  // load the service's module
  beforeEach(module('webdata2App'));

  // instantiate service
  var distributionview;
  beforeEach(inject(function (_distributionview_) {
    distributionview = _distributionview_;
  }));

  it('should do something', function () {
    expect(!!distributionview).toBe(true);
  });

});
