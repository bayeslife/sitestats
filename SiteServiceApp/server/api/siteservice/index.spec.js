'use strict';

var proxyquire = require('proxyquire').noPreserveCache();

var siteserviceCtrlStub = {
  index: 'siteserviceCtrl.index',
  show: 'siteserviceCtrl.show',
  create: 'siteserviceCtrl.create',
  update: 'siteserviceCtrl.update',
  destroy: 'siteserviceCtrl.destroy'
};

var routerStub = {
  get: sinon.spy(),
  put: sinon.spy(),
  patch: sinon.spy(),
  post: sinon.spy(),
  delete: sinon.spy()
};

// require the index with our stubbed out modules
var siteserviceIndex = proxyquire('./index.js', {
  'express': {
    Router: function() {
      return routerStub;
    }
  },
  './siteservice.controller': siteserviceCtrlStub
});

describe('Siteservice API Router:', function() {

  it('should return an express router instance', function() {
    siteserviceIndex.should.equal(routerStub);
  });

  describe('GET /api/siteservices', function() {

    it('should route to siteservice.controller.index', function() {
      routerStub.get
        .withArgs('/', 'siteserviceCtrl.index')
        .should.have.been.calledOnce;
    });

  });

  describe('GET /api/siteservices/:id', function() {

    it('should route to siteservice.controller.show', function() {
      routerStub.get
        .withArgs('/:id', 'siteserviceCtrl.show')
        .should.have.been.calledOnce;
    });

  });

  describe('POST /api/siteservices', function() {

    it('should route to siteservice.controller.create', function() {
      routerStub.post
        .withArgs('/', 'siteserviceCtrl.create')
        .should.have.been.calledOnce;
    });

  });

  describe('PUT /api/siteservices/:id', function() {

    it('should route to siteservice.controller.update', function() {
      routerStub.put
        .withArgs('/:id', 'siteserviceCtrl.update')
        .should.have.been.calledOnce;
    });

  });

  describe('PATCH /api/siteservices/:id', function() {

    it('should route to siteservice.controller.update', function() {
      routerStub.patch
        .withArgs('/:id', 'siteserviceCtrl.update')
        .should.have.been.calledOnce;
    });

  });

  describe('DELETE /api/siteservices/:id', function() {

    it('should route to siteservice.controller.destroy', function() {
      routerStub.delete
        .withArgs('/:id', 'siteserviceCtrl.destroy')
        .should.have.been.calledOnce;
    });

  });

});
