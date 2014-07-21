'use strict';

var publish_key = "demo";
var subscribe_key = "demo";
var channel = "my_channel2";

var pubnub = require("pubnub").init({
    publish_key   : publish_key,
    subscribe_key : subscribe_key
});

/**
 * publish to pubnub
 */
var publish = function(msg) {
  pubnub.publish({ 
      channel   : channel,
      message   : msg,
      callback  : function(e) { console.log( "pub to pubnub success!", e ); },
      error     : function(e) { console.log( "pub to pubnub failed!  retry pub!", e ); }
  });
}

/**
 * listen and print out msg to the channel
 */
var subscribe = function(msg) {
  pubnub.subscribe({
      channel  : channel,
      callback : function(message) {
          console.log( " received from channel: \n", message );
      }
  });
}

var run = function() {
  // Replace '../bitcore' with 'bitcore' if you use this code elsewhere.
  var bitcore = require('bitcore');
  var Peer = bitcore.Peer;
  var PeerManager = bitcore.PeerManager;

  var handleBlock = function(info) {
    console.log('** Block Received **');
    console.log(info.message);
    publish(info.message);
  };

  var handleTx = function(info) {
    var tx = info.message.tx.getStandardizedObject();

    console.log('** TX Received **');
    console.log(tx);
    publish(tx);
  };

  var handleInv = function(info) {
    console.log('** Inv **');
    console.log(info.message);

    var invs = info.message.invs;
    info.conn.sendGetData(invs);
  };

  var peerman = new PeerManager({
    network: 'testnet'
  });

  peerman.addPeer(new Peer('127.0.0.1', 18333));

  peerman.on('connection', function(conn) {
    conn.on('inv', handleInv);
    conn.on('block', handleBlock);
    conn.on('tx', handleTx);
  });

  peerman.start();
};



module.exports.run = run;
if (require.main === module) {
  run();
}
