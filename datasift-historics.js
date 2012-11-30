/*global module*/
/*jslint node:true*/

'use strict';

var async = require('async'),
        request = require( 'request' ),
        util = require( 'util' ),
        events = require( 'events' ),
        HistoricsApi = require( './datasift-historics-api' ),
        moniker = require( 'moniker' );

var Historics = function( api, options ) {
    /**
     * Guide here:
     * http://dev.datasift.com/docs/historics/historics-steps
     */
    
    events.EventEmitter.call( this );
    
    // DataSift API URI
    this.api = api;
    
    // Prepare settings for Datasift
    this.options = options;
    
    // Generate a name for this historics query
    this.options.name = this.options.name || moniker.choose()+'-'+new Date().getTime();
    
    this.prepare();
};

util.inherits( Historics, events.EventEmitter );

Historics.prototype.prepare = function() {
    var api = this.api,
        options = {
            'hash': this.options['hash'],
            'start': this.options['start'],
            'end': this.options['end'],
            'sources': this.options['sources'],
            'sample': this.options['sample']
        };
    
    HistoricsApi.prepare( api, options, function( error, data ) {
        if( !error ) {
            this.options['playback_id'] = data.id;
            this.emit( 'ready', data );
        } else {
            this.emit( 'error', error );
        }
    }.bind( this ));
};

Historics.prototype.start = function() {
    var api = this.api,
        createOptions = {
            'playback_id': this.options['playback_id'],
            'name': this.options['name'],
            'output_type': this.options['output_type'],
            'output_params': this.options['output_params']
        },
        startOptions = {
            'playback_id': this.options['playback_id']
        };
    
    async.series(
        [
            function( callback ) {
                HistoricsApi.create( api, createOptions, function( error, data ) {
                    callback( error, data );
                });
            },
            function( callback ){
                HistoricsApi.start( api, startOptions, function( error, data ) {
                    callback( error, data );
                });
            }
        ],
        function( error, data ) {
            if( !error ) {
                this.emit( 'started', data );
            } else {
                this.emit( 'error', error );
            }
        }.bind( this )
    );

};

Historics.prototype.stop = function() {
    var api = this.api,
        options = {
            'playback_id': this.options['playback_id']
        };
    
    HistoricsApi.stop( api, options, function( error, data ) {
        if( !error ) {
            this.emit( 'stopped', data );
        } else {
            this.emit( 'error', error );
        }
    }.bind( this ));
};

Historics.prototype.remove = function() {
    var api = this.api,
        options = {
            'playback_id': this.options['playback_id']
        };
    
    HistoricsApi.remove( api, options, function( error, data ) {
        if( !error ) {
            this.emit( 'removed', data );
        } else {
            this.emit( 'error', error );
        }
    }.bind( this ));
};

module.exports = Historics;