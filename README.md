# Socket server and test push script

We should create socket server to recive connections from both
client and server side and script to send test request from 
client side.


## Requirements

* You should have [php][1] and [composer][2] installed
* We are using [Rat chet][3] as a web socket server
* And [Websocket Client for PHP][4] as a web socket server


## Install

    $ composer install


## Configuration

You should change port number inside `./bin/transport-server.php` and
web socket port and uri `$client = new Client("ws://178.79.181.157:8181");` in the `./bin/transport-test.php` to your own.


## Run socket server

To start socket server you should run:

    $ php ./bin/transport-server.php


## Send notification

After clients will connect to socket server you may run:

    $ php ./bin/transport-test.php

And check work of notifications this way.

## Keep server running

On Linux you may just create init script 


    # Info
    description "Runs the Web Socket Server"
    author      "Name Surname"

    # Events
    start on startup  
    stop on shutdown

    # Automatically respawn
    respawn  
    respawn limit 20 5

    # Run the script!
    # Note, in this example, if your PHP script (the socket) returns
    # the string "ERROR", the daemon will stop itself.
    script  
        [ $(exec /usr/bin/php -f /path/bin/transport-server.php) = 'ERROR' ] && ( stop; exit 1; )
    end script  

[1]: http://php.net/
[2]: https://getcomposer.org/
[3]: http://socketo.me/
[4]: https://github.com/Textalk/websocket-php