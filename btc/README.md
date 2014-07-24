setup
----------
```
  sudo npm install bitcore
  sudo npm install pubnub
```

configure
----------
change ip address and port number to point to your bitcoind.  18333 is default bitcoind testnet port.  
```
peerman.addPeer(new Peer('127.0.0.1', 18333));
```

run
---------- 
```
  node main.js
```
