'use strict';

var app = require('../..');
var request = require('supertest');

var newSiteservice;

describe('Siteservice API:', function() {

  describe('GET /api/siteservices', function() {
    var siteservices;

    beforeEach(function(done) {
      request(app)
        .get('/api/siteservices')
        .expect(200)
        .expect('Content-Type', /json/)
        .end(function(err, res) {
          if (err) {
            return done(err);
          }
          siteservices = res.body;
          done();
        });
    });

    it('should respond with JSON array', function() {
      siteservices.should.be.instanceOf(Array);
    });

  });

  describe('POST /api/siteservices', function() {
    beforeEach(function(done) {
      request(app)
        .post('/api/siteservices')
        .send({
          name: 'New Siteservice',
          info: 'This is the brand new siteservice!!!'
        })
        .expect(201)
        .expect('Content-Type', /json/)
        .end(function(err, res) {
          if (err) {
            return done(err);
          }
          newSiteservice = res.body;
          done();
        });
    });

    it('should respond with the newly created siteservice', function() {
      newSiteservice.name.should.equal('New Siteservice');
      newSiteservice.info.should.equal('This is the brand new siteservice!!!');
    });

  });

  describe('GET /api/siteservices/:id', function() {
    var siteservice;

    beforeEach(function(done) {
      request(app)
        .get('/api/siteservices/' + newSiteservice._id)
        .expect(200)
        .expect('Content-Type', /json/)
        .end(function(err, res) {
          if (err) {
            return done(err);
          }
          siteservice = res.body;
          done();
        });
    });

    afterEach(function() {
      siteservice = {};
    });

    it('should respond with the requested siteservice', function() {
      siteservice.name.should.equal('New Siteservice');
      siteservice.info.should.equal('This is the brand new siteservice!!!');
    });

  });

  describe('PUT /api/siteservices/:id', function() {
    var updatedSiteservice

    beforeEach(function(done) {
      request(app)
        .put('/api/siteservices/' + newSiteservice._id)
        .send({
          name: 'Updated Siteservice',
          info: 'This is the updated siteservice!!!'
        })
        .expect(200)
        .expect('Content-Type', /json/)
        .end(function(err, res) {
          if (err) {
            return done(err);
          }
          updatedSiteservice = res.body;
          done();
        });
    });

    afterEach(function() {
      updatedSiteservice = {};
    });

    it('should respond with the updated siteservice', function() {
      updatedSiteservice.name.should.equal('Updated Siteservice');
      updatedSiteservice.info.should.equal('This is the updated siteservice!!!');
    });

  });

  describe('DELETE /api/siteservices/:id', function() {

    it('should respond with 204 on successful removal', function(done) {
      request(app)
        .delete('/api/siteservices/' + newSiteservice._id)
        .expect(204)
        .end(function(err, res) {
          if (err) {
            return done(err);
          }
          done();
        });
    });

    it('should respond with 404 when siteservice does not exist', function(done) {
      request(app)
        .delete('/api/siteservices/' + newSiteservice._id)
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
