/*global*/
/*jslint node:true*/

'use strict';

var request = require( 'request' );

var defaults = {
    url: 'https://api.datasift.com/'
};

function isResponseOkay( statusCode ) {
    return (/^2[0-9]{2}$/.exec( statusCode ))
        ? true
        : false;
}

function apiRequestWithCallback( api, options, callback ) {
    var responseOkay,
        error,
        uri,
        headers,
        requestOptions;
        
    uri = (api.url || defaults.url) + options.endpoint;
    
    headers = {
        'Authorization': api.username + ':' + api.key
    };
    
    requestOptions = {
        uri: uri,
        headers: headers,
        qs: options.qs,
        json: true
    };
    
    request.get( requestOptions, function( err, response, body ) {
        responseOkay = isResponseOkay( response.statusCode );
        if ( !err && responseOkay ) {
            callback( null, body );
        } else if( !responseOkay ) {
            error = {
                endpoint: uri,
                options: requestOptions,
                response: response,
                message: body
            };
            callback( error, null );
        } else {
            error = {
                endpoint: uri,
                options: requestOptions,
                response: response,
                message: err
            };
            callback( error, null );
        }
    });
}

exports.prepare = function( api, options, callback ) {
    /*
     * endpoint: historics/prepare
     * http://dev.datasift.com/docs/rest-api/historicsprepare
     */
    
    var endpoint = 'historics/prepare',
        qs,
        requestOptions;

    qs = {
        'hash': options.hash,
        'name': 'q-' + options.name,
        'start': options.start,
        'end': options.end,
        'sources': (options.sources || 'twitter'),
        'sample': (options.sample || 100)
    };
    
    requestOptions = {
        endpoint: endpoint,
        qs: qs
    };
    
    apiRequestWithCallback( api, requestOptions, callback );
};

exports.create = function( api, options, callback ) {
    /*
     * endpoint: push/create
     * http://dev.datasift.com/docs/rest-api/pushcreate
     */
    
    var endpoint = 'push/create',
        qs = [],
        requestOptions;
    
    qs = {
        name: 's-' + options.name,
        playback_id: options.playback_id,
        output_type: options.output_type
    };
    
    for( var i in options.output_params ) {
        qs['output_params.'+i] = options.output_params[i];
    }
    
    requestOptions = {
        endpoint: endpoint,
        qs: qs
    };
    
    apiRequestWithCallback( api, requestOptions, callback );
};

exports.start = function( api, options, callback ) {
    /*
     * endpoint: historics/start
     * http://dev.datasift.com/docs/rest-api/historicsstart
     */
    
    var endpoint = 'historics/start',
        qs,
        requestOptions;
    
    qs = {
        'id': options.playback_id
    };
    
    requestOptions = {
        endpoint: endpoint,
        qs: qs
    };
    
    apiRequestWithCallback( api, requestOptions, callback );
};

exports.stop = function( api, options, callback ) {
    /*
     * endpoint: historics/stop
     * http://dev.datasift.com/docs/rest-api/historicsstop
     */
    
    var endpoint = 'historics/stop',
        qs,
        requestOptions;
    
    qs = {
        'id': options.playback_id
    };
    
    requestOptions = {
        endpoint: endpoint,
        qs: qs
    };
    
    apiRequestWithCallback( api, requestOptions, callback );
};

/**
 * Method for datasift historics endpoint:
 * historics/delete
 * http://dev.datasift.com/docs/rest-api/historicsdelete
 * @param  {object}   api      API username / key
 * @param  {object}   options  Options to be passed to the API
 * @param  {Function} callback Callback
 */
exports.remove = function( api, options, callback ) {
    var endpoint = 'historics/delete',
        qs,
        requestOptions;
    
    qs = {
        'id': options.playback_id
    };
    
    requestOptions = {
        endpoint: endpoint,
        qs: qs
    };
    
    apiRequestWithCallback( api, requestOptions, callback );
};