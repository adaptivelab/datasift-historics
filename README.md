# DataSift Historics

A node.js library to interface with the DataSift Historics API

## Installation

    npm install datasift-historics


## Usage
    var historics,
        oneDayAgo;

    oneDayAgo = Math.floor( new Date().getTime() / 1000 ) - 86400;

    historics = new Historics(
        {
          'username': '[YOUR DATASIFT USERNAME HERE]'
          'key': '[YOUR DATASIFT API KEY HERE]'
        },
        {
            'hash': '[YOUR SUBSCRIPTION HASH HERE]',
            'start': oneDayAgo - 3600,
            'end': oneDayAgo,
            'output_type': 'mongodb',
            'output_params': {
                
            }
        }
    );

    historics.on( 'ready', function( info ) {
        if( info.dpus < 0.1 ) {  // Costs money, check DPUs first!
            historics.start();
        }
    });
