'use strict';

var proxyquire = require('proxyquire').noPreserveCache();

var vendorCtrlStub = {
  index: 'vendorCtrl.index',
  show: 'vendorCtrl.show',
  create: 'vendorCtrl.create',
  update: 'vendorCtrl.update',
  destroy: 'vendorCtrl.destroy'
};

var routerStub = {
  get: sinon.spy(),
  put: sinon.spy(),
  patch: sinon.spy(),
  post: sinon.spy(),
  delete: sinon.spy()
};

// require the index with our stubbed out modules
var vendorIndex = proxyquire('./index.js', {
  'express': {
    Router: function() {
      return routerStub;
    }
  },
  './vendor.controller': vendorCtrlStub
});

describe('Vendor API Router:', function() {

  it('should return an express router instance', function() {
    vendorIndex.should.equal(routerStub);
  });

  describe('GET /api/vendors', function() {

    it('should route to vendor.controller.index', function() {
      routerStub.get
        .withArgs('/', 'vendorCtrl.index')
        .should.have.been.calledOnce;
    });

  });

  describe('GET /api/vendors/:id', function() {

    it('should route to vendor.controller.show', function() {
      routerStub.get
        .withArgs('/:id', 'vendorCtrl.show')
        .should.have.been.calledOnce;
    });

  });

  describe('POST /api/vendors', function() {

    it('should route to vendor.controller.create', function() {
      routerStub.post
        .withArgs('/', 'vendorCtrl.create')
        .should.have.been.calledOnce;
    });

  });

  describe('PUT /api/vendors/:id', function() {

    it('should route to vendor.controller.update', function() {
      routerStub.put
        .withArgs('/:id', 'vendorCtrl.update')
        .should.have.been.calledOnce;
    });

  });

  describe('PATCH /api/vendors/:id', function() {

    it('should route to vendor.controller.update', function() {
      routerStub.patch
        .withArgs('/:id', 'vendorCtrl.update')
        .should.have.been.calledOnce;
    });

  });

  describe('DELETE /api/vendors/:id', function() {

    it('should route to vendor.controller.destroy', function() {
      routerStub.delete
        .withArgs('/:id', 'vendorCtrl.destroy')
        .should.have.been.calledOnce;
    });

  });

});
