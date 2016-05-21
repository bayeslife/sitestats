'use strict';

var app = require('../..');
var request = require('supertest');

var newOrg;

describe('Org API:', function() {

  describe('GET /api/orgs', function() {
    var orgs;

    beforeEach(function(done) {
      request(app)
        .get('/api/orgs')
        .expect(200)
        .expect('Content-Type', /json/)
        .end(function(err, res) {
          if (err) {
            return done(err);
          }
          orgs = res.body;
          done();
        });
    });

    it('should respond with JSON array', function() {
      orgs.should.be.instanceOf(Array);
    });

  });

  describe('POST /api/orgs', function() {
    beforeEach(function(done) {
      request(app)
        .post('/api/orgs')
        .send({
          name: 'New Org',
          info: 'This is the brand new org!!!'
        })
        .expect(201)
        .expect('Content-Type', /json/)
        .end(function(err, res) {
          if (err) {
            return done(err);
          }
          newOrg = res.body;
          done();
        });
    });

    it('should respond with the newly created org', function() {
      newOrg.name.should.equal('New Org');
      newOrg.info.should.equal('This is the brand new org!!!');
    });

  });

  describe('GET /api/orgs/:id', function() {
    var org;

    beforeEach(function(done) {
      request(app)
        .get('/api/orgs/' + newOrg._id)
        .expect(200)
        .expect('Content-Type', /json/)
        .end(function(err, res) {
          if (err) {
            return done(err);
          }
          org = res.body;
          done();
        });
    });

    afterEach(function() {
      org = {};
    });

    it('should respond with the requested org', function() {
      org.name.should.equal('New Org');
      org.info.should.equal('This is the brand new org!!!');
    });

  });

  describe('PUT /api/orgs/:id', function() {
    var updatedOrg

    beforeEach(function(done) {
      request(app)
        .put('/api/orgs/' + newOrg._id)
        .send({
          name: 'Updated Org',
          info: 'This is the updated org!!!'
        })
        .expect(200)
        .expect('Content-Type', /json/)
        .end(function(err, res) {
          if (err) {
            return done(err);
          }
          updatedOrg = res.body;
          done();
        });
    });

    afterEach(function() {
      updatedOrg = {};
    });

    it('should respond with the updated org', function() {
      updatedOrg.name.should.equal('Updated Org');
      updatedOrg.info.should.equal('This is the updated org!!!');
    });

  });

  describe('DELETE /api/orgs/:id', function() {

    it('should respond with 204 on successful removal', function(done) {
      request(app)
        .delete('/api/orgs/' + newOrg._id)
        .expect(204)
        .end(function(err, res) {
          if (err) {
            return done(err);
          }
          done();
        });
    });

    it('should respond with 404 when org does not exist', function(done) {
      request(app)
        .delete('/api/orgs/' + newOrg._id)
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
