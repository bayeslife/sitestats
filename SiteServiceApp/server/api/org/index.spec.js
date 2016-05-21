'use strict';

var proxyquire = require('proxyquire').noPreserveCache();

var orgCtrlStub = {
  index: 'orgCtrl.index',
  show: 'orgCtrl.show',
  create: 'orgCtrl.create',
  update: 'orgCtrl.update',
  destroy: 'orgCtrl.destroy'
};

var routerStub = {
  get: sinon.spy(),
  put: sinon.spy(),
  patch: sinon.spy(),
  post: sinon.spy(),
  delete: sinon.spy()
};

// require the index with our stubbed out modules
var orgIndex = proxyquire('./index.js', {
  'express': {
    Router: function() {
      return routerStub;
    }
  },
  './org.controller': orgCtrlStub
});

describe('Org API Router:', function() {

  it('should return an express router instance', function() {
    orgIndex.should.equal(routerStub);
  });

  describe('GET /api/orgs', function() {

    it('should route to org.controller.index', function() {
      routerStub.get
        .withArgs('/', 'orgCtrl.index')
        .should.have.been.calledOnce;
    });

  });

  describe('GET /api/orgs/:id', function() {

    it('should route to org.controller.show', function() {
      routerStub.get
        .withArgs('/:id', 'orgCtrl.show')
        .should.have.been.calledOnce;
    });

  });

  describe('POST /api/orgs', function() {

    it('should route to org.controller.create', function() {
      routerStub.post
        .withArgs('/', 'orgCtrl.create')
        .should.have.been.calledOnce;
    });

  });

  describe('PUT /api/orgs/:id', function() {

    it('should route to org.controller.update', function() {
      routerStub.put
        .withArgs('/:id', 'orgCtrl.update')
        .should.have.been.calledOnce;
    });

  });

  describe('PATCH /api/orgs/:id', function() {

    it('should route to org.controller.update', function() {
      routerStub.patch
        .withArgs('/:id', 'orgCtrl.update')
        .should.have.been.calledOnce;
    });

  });

  describe('DELETE /api/orgs/:id', function() {

    it('should route to org.controller.destroy', function() {
      routerStub.delete
        .withArgs('/:id', 'orgCtrl.destroy')
        .should.have.been.calledOnce;
    });

  });

});
