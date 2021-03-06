/*global describe, it*/


'use strict';


var zlib        = require('zlib');
var assert      = require('assert');

var pako        = require('../index');
var helpers     = require('./helpers');
var testInflate = helpers.testInflate;


var samples = helpers.loadSamples();

describe('Inflate defaults', function () {

  it('inflate, no options', function (done) {
    testInflate(samples, {}, {}, done);
  });

  it('inflate raw, no options', function (done) {
    testInflate(samples, { raw: true }, { raw: true }, done);
  });

  it('inflate raw from compressed samples', function (done) {
    var compressed_samples = helpers.loadSamples('samples_deflated_raw');
    helpers.testSamples(zlib.createInflateRaw, pako.inflateRaw, compressed_samples, {}, done, 'inflate_raw');
  });

});


describe('Inflate ungzip', function () {
  it('with autodetect', function (done) {
    testInflate(samples, {}, { gzip: true }, done);
  });

  it('with method set directly', function (done) {
    testInflate(samples, { windowBits: 16 }, { gzip: true }, done);
  });
});


describe('Inflate levels', function () {

  it('level 9', function (done) {
    testInflate(samples, {}, { level: 9 }, done);
  });
  it('level 8', function (done) {
    testInflate(samples, {}, { level: 8 }, done);
  });
  it('level 7', function (done) {
    testInflate(samples, {}, { level: 7 }, done);
  });
  it('level 6', function (done) {
    testInflate(samples, {}, { level: 6 }, done);
  });
  it('level 5', function (done) {
    testInflate(samples, {}, { level: 5 }, done);
  });
  it('level 4', function (done) {
    testInflate(samples, {}, { level: 4 }, done);
  });
  it('level 3', function (done) {
    testInflate(samples, {}, { level: 3 }, done);
  });
  it('level 2', function (done) {
    testInflate(samples, {}, { level: 2 }, done);
  });
  it('level 1', function (done) {
    testInflate(samples, {}, { level: 1 }, done);
  });
  it('level 0', function (done) {
    testInflate(samples, {}, { level: 0 }, done);
  });

});


describe('Inflate windowBits', function () {

  it('windowBits 15', function (done) {
    testInflate(samples, {}, { windowBits: 15 }, done);
  });
  it('windowBits 14', function (done) {
    testInflate(samples, {}, { windowBits: 14 }, done);
  });
  it('windowBits 13', function (done) {
    testInflate(samples, {}, { windowBits: 13 }, done);
  });
  it('windowBits 12', function (done) {
    testInflate(samples, {}, { windowBits: 12 }, done);
  });
  it('windowBits 11', function (done) {
    testInflate(samples, {}, { windowBits: 11 }, done);
  });
  it('windowBits 10', function (done) {
    testInflate(samples, {}, { windowBits: 10 }, done);
  });
  it('windowBits 9', function (done) {
    testInflate(samples, {}, { windowBits: 9 }, done);
  });
  it('windowBits 8', function (done) {
    testInflate(samples, {}, { windowBits: 8 }, done);
  });

});

describe('Inflate strategy', function () {

  it('Z_DEFAULT_STRATEGY', function (done) {
    testInflate(samples, {}, { strategy: 0 }, done);
  });
  it('Z_FILTERED', function (done) {
    testInflate(samples, {}, { strategy: 1 }, done);
  });
  it('Z_HUFFMAN_ONLY', function (done) {
    testInflate(samples, {}, { strategy: 2 }, done);
  });
  it('Z_RLE', function (done) {
    testInflate(samples, {}, { strategy: 3 }, done);
  });
  it('Z_FIXED', function (done) {
    testInflate(samples, {}, { strategy: 4 }, done);
  });

});


describe('Inflate RAW', function () {
  // Since difference is only in rwapper, test for store/fast/slow methods are enougth
  it('level 9', function (done) {
    testInflate(samples, { raw: true }, { level: 9, raw: true }, done);
  });
  it('level 8', function (done) {
    testInflate(samples, { raw: true }, { level: 8, raw: true }, done);
  });
  it('level 7', function (done) {
    testInflate(samples, { raw: true }, { level: 7, raw: true }, done);
  });
  it('level 6', function (done) {
    testInflate(samples, { raw: true }, { level: 6, raw: true }, done);
  });
  it('level 5', function (done) {
    testInflate(samples, { raw: true }, { level: 5, raw: true }, done);
  });
  it('level 4', function (done) {
    testInflate(samples, { raw: true }, { level: 4, raw: true }, done);
  });
  it('level 3', function (done) {
    testInflate(samples, { raw: true }, { level: 3, raw: true }, done);
  });
  it('level 2', function (done) {
    testInflate(samples, { raw: true }, { level: 2, raw: true }, done);
  });
  it('level 1', function (done) {
    testInflate(samples, { raw: true }, { level: 1, raw: true }, done);
  });
  it('level 0', function (done) {
    testInflate(samples, { raw: true }, { level: 0, raw: true }, done);
  });

});


describe('Inflate with dictionary', function () {

  it('should throw on the wrong dictionary', function () {
    // var zCompressed = helpers.deflateSync('world', { dictionary: new Buffer('hello') });
    var zCompressed = new Buffer([ 120, 187, 6, 44, 2, 21, 43, 207, 47, 202, 73, 1, 0, 6, 166, 2, 41 ]);

    assert.throws(function () {
      pako.inflate(zCompressed, { dictionary: new Buffer('world') });
    }, /data error/);
  });

  it('trivial dictionary', function (done) {
    var dict = new Buffer('abcdefghijklmnoprstuvwxyz');
    testInflate(samples, { dictionary: dict }, { dictionary: dict }, done);
  });

  it('spdy dictionary', function (done) {
    var spdyDict = require('fs').readFileSync(require('path').join(__dirname, 'fixtures', 'spdy_dict.txt'));

    testInflate(samples, { dictionary: spdyDict }, { dictionary: helpers.spdyDict }, done);
  });

});
