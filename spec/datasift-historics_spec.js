/*global describe,it,beforeEach,afterEach*/
/*jslint node:true*/

'use strict';

var expect = require( 'chai' ).expect,
    historicsOptions = require( './fixtures/datasift-historics_options' ),
    HistoricsServer = require( './mocks/datasift-historics-server' ),
    Historics = require( '../datasift-historics' );

var config = require('./config').test;

var historics;

describe( 'Historics', function() {

    beforeEach(function() {
        historics = new Historics( config.datasift.api, historicsOptions.options );
    });

    describe( 'initialize', function() {
        
        it( 'should define settings based on options', function() {
            expect( historics.options ).to.equal( historicsOptions.options );
        });
        
        it( 'should generate a name', function() {
            expect( historics.options.name ).to.be.a('string');
        });
        
        it( 'should save a playback_id after calling api', function( done ) {
            historics.on('ready', function() {
                expect( historics.options.playback_id ).to.be.a('string');
                done();
            });
        });
        
    });
    
    describe( 'start', function() {
        it( 'should emit `started` when api calls are finished', function( done ) {
            historics.start();
            historics.on( 'started', function() {
                done();
            });
        });
    });
    
    describe( 'start', function() {
        it( 'should emit `stopped` when api calls are finished', function( done ) {
            historics.stop();
            historics.on( 'stopped', function() {
                done();
            });
        });
    });
    
    describe( 'remove', function() {
        it( 'should emit `removed` when api calls are finished', function( done ) {
            historics.remove();
            historics.on( 'removed', function() {
                done();
            });
        });
    });
    
});