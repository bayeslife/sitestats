'use strict';

var app = require('../..');
var request = require('supertest');

var newServicealias;

describe('Servicealias API:', function() {

  describe('GET /api/servicealiases', function() {
    var servicealiass;

    beforeEach(function(done) {
      request(app)
        .get('/api/servicealiases')
        .expect(200)
        .expect('Content-Type', /json/)
        .end(function(err, res) {
          if (err) {
            return done(err);
          }
          servicealiass = res.body;
          done();
        });
    });

    it('should respond with JSON array', function() {
      servicealiass.should.be.instanceOf(Array);
    });

  });

  describe('POST /api/servicealiases', function() {
    beforeEach(function(done) {
      request(app)
        .post('/api/servicealiases')
        .send({
          name: 'New Servicealias',
          info: 'This is the brand new servicealias!!!'
        })
        .expect(201)
        .expect('Content-Type', /json/)
        .end(function(err, res) {
          if (err) {
            return done(err);
          }
          newServicealias = res.body;
          done();
        });
    });

    it('should respond with the newly created servicealias', function() {
      newServicealias.name.should.equal('New Servicealias');
      newServicealias.info.should.equal('This is the brand new servicealias!!!');
    });

  });

  describe('GET /api/servicealiases/:id', function() {
    var servicealias;

    beforeEach(function(done) {
      request(app)
        .get('/api/servicealiases/' + newServicealias._id)
        .expect(200)
        .expect('Content-Type', /json/)
        .end(function(err, res) {
          if (err) {
            return done(err);
          }
          servicealias = res.body;
          done();
        });
    });

    afterEach(function() {
      servicealias = {};
    });

    it('should respond with the requested servicealias', function() {
      servicealias.name.should.equal('New Servicealias');
      servicealias.info.should.equal('This is the brand new servicealias!!!');
    });

  });

  describe('PUT /api/servicealiases/:id', function() {
    var updatedServicealias

    beforeEach(function(done) {
      request(app)
        .put('/api/servicealiases/' + newServicealias._id)
        .send({
          name: 'Updated Servicealias',
          info: 'This is the updated servicealias!!!'
        })
        .expect(200)
        .expect('Content-Type', /json/)
        .end(function(err, res) {
          if (err) {
            return done(err);
          }
          updatedServicealias = res.body;
          done();
        });
    });

    afterEach(function() {
      updatedServicealias = {};
    });

    it('should respond with the updated servicealias', function() {
      updatedServicealias.name.should.equal('Updated Servicealias');
      updatedServicealias.info.should.equal('This is the updated servicealias!!!');
    });

  });

  describe('DELETE /api/servicealiases/:id', function() {

    it('should respond with 204 on successful removal', function(done) {
      request(app)
        .delete('/api/servicealiases/' + newServicealias._id)
        .expect(204)
        .end(function(err, res) {
          if (err) {
            return done(err);
          }
          done();
        });
    });

    it('should respond with 404 when servicealias does not exist', function(done) {
      request(app)
        .delete('/api/servicealiases/' + newServicealias._id)
        .expect(404)
        .end(function(err, res) {
          if (err) {
            return done(err);
          }
          done();
        });
    });

  });

});
