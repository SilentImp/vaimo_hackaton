# Client side

Client side of the project contains scripts for transport layer, notifications spawn 
and html page where we may add them


## Requirements

You should have [node.js][1] and [webpack][2] installed globally.


## Install

We should install all package we need to build jade and es6 scripts. Jast execute.

    $ npm install


## Configuration

You should edit `./source/js/app.js` and change web socket uri in the `new Transport('ws://178.79.181.157:8181');` to your own.


## Build client side code

    $ webpack


## Run client side

   $ open ./build/index.html


[1]: https://nodejs.org/
[2]: https://webpack.github.io/