<?php
namespace TransportServer;

use Ratchet\MessageComponentInterface;
use Ratchet\ConnectionInterface;

/**
 * Class TransportServer is socket server for message broadcasting
 * @package TransportServer
 * @class TransportServer
 */
class TransportServer implements MessageComponentInterface {
    protected $clients;
    protected $subscribers;

    /**
     * @constructor initialization of clients and subscribers list
     */
    public function __construct() {
        $this->clients = new \SplObjectStorage;
        $this->subscribers = new \SplObjectStorage;
    }

    /**
     * We should add client to clients list on connection
     * @param ConnectionInterface $connection — client connection
     */
    public function onOpen(ConnectionInterface $connection) {
        $this->clients->attach($connection);
        echo "Connection {$connection->resourceId} has сonnected\n";
    }

    /**
     * On message we should check if it contains supported command and
     * execute it
     * @param ConnectionInterface $connection — client connection
     * @param string $msg — message from client, should contain command and
     * may contain data
     */
    public function onMessage(ConnectionInterface $connection, $msg) {

        $msg = json_decode($msg);
        if(!isset($msg->command)) return;

        switch($msg->command) {
            case 'SUBSCRIBE':
                $this->subscribers->attach($connection);
                break;

            case 'UNSUBSCRIBE':
                $this->subscribers->detach($connection);
                break;

            case 'BROADCAST':
                if(!isset($msg->data)) return;
                foreach ($this->subscribers as $subscriber) {
                    if ($connection === $subscriber) continue;
                    $subscriber->send(json_encode($msg->data));
                }
                break;
        }
    }

    /**
     * We shold remove client from clients and subscribers list on disconnect
     * @param ConnectionInterface $connection — client connection
     */
    public function onClose(ConnectionInterface $connection) {
        if($this->clients->contains($connection)) $this->clients->detach($connection);
        if($this->subscribers->contains($connection)) $this->subscribers->detach($connection);
        echo "Connection {$connection->resourceId} has disconnected\n";
    }

    /**
     * On error we should echo information about it and close connection
     * @param ConnectionInterface $connection — client connection
     * @param \Exception $error — error details
     */
    public function onError(ConnectionInterface $connection, \Exception $error) {
        $connection->close();
        echo "An error has occurred: {$error->getMessage()}\n";
    }
}
