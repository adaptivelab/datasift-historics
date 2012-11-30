/*global*/
/*jslint node:true*/

'use strict';

var http = require( 'http' ),
    url = require( 'url' ),
    events = require( 'events' ),
    util = require( 'util' ),
    historicsServerReponses = require( './datasift-historics-server_responses' ),
    HistoricsServer;

HistoricsServer = function() {
    events.EventEmitter.call( this );
    
    var dummyServer,
        self = this;
    
    dummyServer = http.createServer(function (req, res) {
        
        var endpoint = url.parse( req.url );
        
        switch( endpoint.pathname ) {
            case '/historics/prepare':
                res.writeHead(200, {'Content-Type': 'text/json'});
                res.end( JSON.stringify( historicsServerReponses.prepare ) );
                break;
            case '/push/create':
                res.writeHead(200, {'Content-Type': 'text/json'});
                res.end( JSON.stringify( historicsServerReponses.create ) );
                break;
            case '/historics/start':
                res.writeHead(200, {'Content-Type': 'text/json'});
                res.end( JSON.stringify( historicsServerReponses.start ) );
                break;
            case '/historics/stop':
                res.writeHead(200, {'Content-Type': 'text/json'});
                res.end( JSON.stringify( historicsServerReponses.stop ) );
                break;
            case '/historics/delete':
                res.writeHead(200, {'Content-Type': 'text/json'});
                res.end( JSON.stringify( historicsServerReponses.remove ) );
                break;
            default:
                res.writeHead(404);
                res.end();
        }
        
        self.emit('request', req);
        
    });

    dummyServer.listen( 9000, '127.0.0.1');
};
util.inherits(HistoricsServer, events.EventEmitter);

HistoricsServer.prototype.getLastRequest = function() {
    return this.requestLog[this.requestLog.length-1];
};

module.exports = new HistoricsServer();