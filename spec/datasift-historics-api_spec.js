/*global describe,it*/
/*jslint node:true*/

'use strict';

var expect = require( 'chai' ).expect,
    url = require( 'url' ),
    options = require( './fixtures/datasift-historics-api_options' ),
    HistoricsApi = require( '../datasift-historics-api' ),
    HistoricsServer = require( './mocks/datasift-historics-server' );

var config = require('./config').test;

describe( 'HistoricsApi', function() {
    var request,
        path,
        query,
        authorization = config.datasift.api.username + ':' + config.datasift.api.key;

    describe( 'prepare', function() {
        
        it( 'should call the callback', function( done ) {
            HistoricsApi.prepare( config.datasift.api, options.prepare, function( error, data ) {
                expect( error ).to.be.defined;
                expect( data ).to.be.defined;
                done();
            });
        });
        
        it( 'should call the endpoint `/historics/prepare`', function( done ) {
            HistoricsServer.once('request', function( request ) {
                path = url.parse(request.url).pathname;
                expect( path ).to.be.eq( '/historics/prepare' );
                done();
            });
            HistoricsApi.prepare( config.datasift.api, options.prepare, function() {});
        });
        
        it( 'should send auth headers', function( done ) {
            HistoricsServer.once('request', function( request ) {
                expect( request.headers.authorization ).to.be.eq( authorization );
                
                done();
            });
            HistoricsApi.prepare( config.datasift.api, options.prepare, function() {});
        });
        
        it( 'should send a request that matches api spec', function( done ) {
            HistoricsServer.once('request', function( request ) {
                query = url.parse( request.url, true ).query;
                
                expect( query['name'] ).to.be.a( 'string' );
                expect( query['hash'] ).to.be.a( 'string' );
                expect( query['start'] ).to.be.a( 'string' );
                expect( query['end'] ).to.be.a( 'string' );
                expect( query['sources'] ).to.be.a( 'string' );
                expect( query['sample'] ).to.be.a( 'string' );
                
                done();
            });
            HistoricsApi.prepare( config.datasift.api, options.prepare, function() {});
        });
    });
    
    describe( 'create', function() {
        
        it( 'should call the callback', function( done ) {
            HistoricsApi.create( config.datasift.api, options.create, function() {
                done();
            });
        });
        
        it( 'should call the endpoint `/push/create`', function( done ) {
            HistoricsServer.once('request', function( request ) {
                path = url.parse(request.url).pathname;
                expect( path ).to.be.eq( '/push/create' );
                done();
            });
            HistoricsApi.create( config.datasift.api, options.create, function() {});
        });
        
        it( 'should send auth headers', function( done ) {
            
            HistoricsServer.once('request', function( request ) {
                expect( request.headers.authorization ).to.be.eq( authorization );
                
                done();
            });
            HistoricsApi.create( config.datasift.api, options.create, function() {});
            
        });
        
        it( 'should send a request that matches api spec', function( done ) {
            
            HistoricsServer.once('request', function( request ) {
                query = url.parse( request.url, true ).query;
                
                expect( query['name'] ).to.be.a( 'string' );
                expect( query['playback_id'] ).to.be.a( 'string' );
                expect( query['output_type'] ).to.be.a( 'string' );
                
                done();
            });
            HistoricsApi.create( config.datasift.api, options.create, function() {});
            
        });
        
    });

    describe( 'start', function() {
        
        it( 'should call the callback', function( done ) {
            HistoricsApi.start( config.datasift.api, options.start, function( error, data ) {
                expect( error ).to.be.defined;
                expect( data ).to.be.defined;
                done();
            });
        });
        
        it( 'should call the endpoint `/historics/start`', function( done ) {
            HistoricsServer.once('request', function( request ) {
                path = url.parse(request.url).pathname;
                expect( path ).to.be.eq( '/historics/start' );
                done();
            });
            HistoricsApi.start( config.datasift.api, options.start, function() {});
        });
        
        it( 'should send auth headers', function( done ) {
            
            HistoricsServer.once('request', function( request ) {
                expect( request.headers.authorization ).to.be.eq( authorization );
                
                done();
            });
            HistoricsApi.start( config.datasift.api, options.start, function() {});
            
        });
        
        it( 'should send a request that matches api spec', function( done ) {
            
            HistoricsServer.once('request', function( request ) {
                query = url.parse( request.url, true ).query;
                expect( query['id'] ).to.be.a( 'string' );
                done();
            });
            HistoricsApi.start( config.datasift.api, options.start, function() {});
            
        });
        
    });

    describe( 'stop', function() {
        
        it( 'should call the callback', function( done ) {
            HistoricsApi.stop( config.datasift.api, options.stop, function( error, data ) {
                expect( error ).to.be.defined;
                expect( data ).to.be.defined;
                done();
            });
        });
        
        it( 'should call the endpoint `/historics/stop`', function( done ) {
            HistoricsServer.once('request', function( request ) {
                path = url.parse(request.url).pathname;
                expect( path ).to.be.eq( '/historics/stop' );
                done();
            });
            HistoricsApi.stop( config.datasift.api, options.stop, function() {});
        });
        
        it( 'should send auth headers', function( done ) {
            
            HistoricsServer.once('request', function( request ) {
                expect( request.headers.authorization ).to.be.eq( authorization );
                
                done();
            });
            HistoricsApi.stop( config.datasift.api, options.stop, function() {});
            
        });
        
        it( 'should send a request that matches api spec', function( done ) {
            
            HistoricsServer.once('request', function( request ) {
                query = url.parse( request.url, true ).query;
                
                expect( query['id'] ).to.be.a( 'string' );
                
                done();
            });
            HistoricsApi.stop( config.datasift.api, options.stop, function() {});
            
        });
        
    });

    describe( 'remove', function() {
        
        it( 'should call the callback', function( done ) {
            HistoricsApi.remove( config.datasift.api, options.remove, function( error, data ) {
                expect( error ).to.be.defined;
                expect( data ).to.be.defined;
                done();
            });
        });
        
        it( 'should call the endpoint `/historics/delete`', function( done ) {
            HistoricsServer.once('request', function( request ) {
                path = url.parse(request.url).pathname;
                expect( path ).to.be.eq( '/historics/delete' );
                done();
            });
            HistoricsApi.remove( config.datasift.api, options.remove, function() {});
        });
        
        it( 'should send auth headers', function( done ) {      
            HistoricsServer.once('request', function( request ) {
                expect( request.headers.authorization ).to.be.eq( authorization );
                done();
            });
            HistoricsApi.remove( config.datasift.api, options.remove, function() {});  
        });
        
        it( 'should send a request that matches api spec', function( done ) {
            HistoricsServer.once('request', function( request ) {
                query = url.parse( request.url, true ).query;
                expect( query['id'] ).to.be.a( 'string' );
                done();
            });
            
            HistoricsApi.remove( config.datasift.api, options.remove, function() {});
        });
        
    });
    
});