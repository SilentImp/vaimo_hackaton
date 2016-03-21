"use strict";

const RECCONECT = true // Should we reconnect on disconnect
    , RECONNECT_DELAY = 5000; // What delay between reconnect attempt should be

/**
 * @class Transport class, it should allow connect
 * backend and frontend and pass data and commands
 */
class Transport {

    /**
     * @constructor bind context and connect to socket server
     * @param {string} uri — ws:// uri of socket server
     */
    constructor(uri) {
        if (typeof uri === "undefiend") throw new Error('Transport ::: You should pass web socket server url as a parameter');
        this.uri = uri;
        this.onOpen = this.onOpen.bind(this);
        this.onClose = this.onClose.bind(this);
        this.connect = this.connect.bind(this);
        this.onMessage = this.onMessage.bind(this);
        this.connect();
    }

    /**
     * Connect to socket and add event handlers
     */
    connect () {
        this.connection = new WebSocket(this.uri);
        this.connection.onopen = this.onOpen;
        this.connection.onclose = this.onClose;
        this.connection.onmessage = this.onMessage;
    }

    /**
     * When client is connected we should subscribe to broadcasting
     */
    onOpen () {
        this.connection.send(JSON.stringify({command:"SUBSCRIBE"}));
    }

    /**
     * When we get message we should check if it contains a
     * command and execute it
     * @param event
     */
    onMessage (event) {
        const data = JSON.parse(event.data);
        switch (data.type) {
            case "EVENT":
                this.constructor.dispatchEvent(data);
                break;
        }
    }

    /**
     * When connection is closed we should reconnect
     */
    onClose () {
        if (RECCONECT) setTimeout(this.connect, RECONNECT_DELAY);
    }

    /**
     * Dispatch event on the basis of message
     * @param {object} message — message contains information about
     * package name, event type and data, event will carry
     */
    static dispatchEvent (message) {
        const {package_name, event_type, event_data} = message;
        if (typeof package_name === "undefined" || typeof event_type === "undefined") {
            throw new Error('Transport ::: Wrong event data format');
        }
        const event_name = package_name + ":::" + event_type
            , event = new CustomEvent(event_name, {'detail': event_data });
        document.dispatchEvent(event);
    }
}

export default Transport;