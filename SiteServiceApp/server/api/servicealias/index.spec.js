'use strict';

var proxyquire = require('proxyquire').noPreserveCache();

var servicealiasCtrlStub = {
  index: 'servicealiasCtrl.index',
  show: 'servicealiasCtrl.show',
  create: 'servicealiasCtrl.create',
  update: 'servicealiasCtrl.update',
  destroy: 'servicealiasCtrl.destroy'
};

var routerStub = {
  get: sinon.spy(),
  put: sinon.spy(),
  patch: sinon.spy(),
  post: sinon.spy(),
  delete: sinon.spy()
};

// require the index with our stubbed out modules
var servicealiasIndex = proxyquire('./index.js', {
  'express': {
    Router: function() {
      return routerStub;
    }
  },
  './servicealias.controller': servicealiasCtrlStub
});

describe('Servicealias API Router:', function() {

  it('should return an express router instance', function() {
    servicealiasIndex.should.equal(routerStub);
  });

  describe('GET /api/servicealiases', function() {

    it('should route to servicealias.controller.index', function() {
      routerStub.get
        .withArgs('/', 'servicealiasCtrl.index')
        .should.have.been.calledOnce;
    });

  });

  describe('GET /api/servicealiases/:id', function() {

    it('should route to servicealias.controller.show', function() {
      routerStub.get
        .withArgs('/:id', 'servicealiasCtrl.show')
        .should.have.been.calledOnce;
    });

  });

  describe('POST /api/servicealiases', function() {

    it('should route to servicealias.controller.create', function() {
      routerStub.post
        .withArgs('/', 'servicealiasCtrl.create')
        .should.have.been.calledOnce;
    });

  });

  describe('PUT /api/servicealiases/:id', function() {

    it('should route to servicealias.controller.update', function() {
      routerStub.put
        .withArgs('/:id', 'servicealiasCtrl.update')
        .should.have.been.calledOnce;
    });

  });

  describe('PATCH /api/servicealiases/:id', function() {

    it('should route to servicealias.controller.update', function() {
      routerStub.patch
        .withArgs('/:id', 'servicealiasCtrl.update')
        .should.have.been.calledOnce;
    });

  });

  describe('DELETE /api/servicealiases/:id', function() {

    it('should route to servicealias.controller.destroy', function() {
      routerStub.delete
        .withArgs('/:id', 'servicealiasCtrl.destroy')
        .should.have.been.calledOnce;
    });

  });

});
