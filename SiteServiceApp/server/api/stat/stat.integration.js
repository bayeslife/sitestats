'use strict';

var app = require('../..');
var request = require('supertest');

var newStat;

describe('Stat API:', function() {

  describe('GET /api/stats', function() {
    var stats;

    beforeEach(function(done) {
      request(app)
        .get('/api/stats')
        .expect(200)
        .expect('Content-Type', /json/)
        .end(function(err, res) {
          if (err) {
            return done(err);
          }
          stats = res.body;
          done();
        });
    });

    it('should respond with JSON array', function() {
      stats.should.be.instanceOf(Array);
    });

  });

  describe('POST /api/stats', function() {
    beforeEach(function(done) {
      request(app)
        .post('/api/stats')
        .send({
          name: 'New Stat',
          info: 'This is the brand new stat!!!'
        })
        .expect(201)
        .expect('Content-Type', /json/)
        .end(function(err, res) {
          if (err) {
            return done(err);
          }
          newStat = res.body;
          done();
        });
    });

    it('should respond with the newly created stat', function() {
      newStat.name.should.equal('New Stat');
      newStat.info.should.equal('This is the brand new stat!!!');
    });

  });

  describe('GET /api/stats/:id', function() {
    var stat;

    beforeEach(function(done) {
      request(app)
        .get('/api/stats/' + newStat._id)
        .expect(200)
        .expect('Content-Type', /json/)
        .end(function(err, res) {
          if (err) {
            return done(err);
          }
          stat = res.body;
          done();
        });
    });

    afterEach(function() {
      stat = {};
    });

    it('should respond with the requested stat', function() {
      stat.name.should.equal('New Stat');
      stat.info.should.equal('This is the brand new stat!!!');
    });

  });

  describe('PUT /api/stats/:id', function() {
    var updatedStat

    beforeEach(function(done) {
      request(app)
        .put('/api/stats/' + newStat._id)
        .send({
          name: 'Updated Stat',
          info: 'This is the updated stat!!!'
        })
        .expect(200)
        .expect('Content-Type', /json/)
        .end(function(err, res) {
          if (err) {
            return done(err);
          }
          updatedStat = res.body;
          done();
        });
    });

    afterEach(function() {
      updatedStat = {};
    });

    it('should respond with the updated stat', function() {
      updatedStat.name.should.equal('Updated Stat');
      updatedStat.info.should.equal('This is the updated stat!!!');
    });

  });

  describe('DELETE /api/stats/:id', function() {

    it('should respond with 204 on successful removal', function(done) {
      request(app)
        .delete('/api/stats/' + newStat._id)
        .expect(204)
        .end(function(err, res) {
          if (err) {
            return done(err);
          }
          done();
        });
    });

    it('should respond with 404 when stat does not exist', function(done) {
      request(app)
        .delete('/api/stats/' + newStat._id)
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
