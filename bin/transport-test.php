<?php

require dirname(__DIR__) . '/vendor/autoload.php';

function getMessage() {
    $notification = [
        "title" => "notification test"
        , "dir" => "ltr"
        , "lang" => "en"
        , "body" => "some message you deadly need to see"
        , "sticky" => true
    ];

    $command = [
        "type" => "EVENT"
        , "package_name" => "NOTIFICATIONS"
        , "event_type" => "NEW"
        , "event_data" => $notification
    ];

    $message = [
        "command"=>"BROADCAST"
        , "data"=>$command
    ];

    return json_encode($message);
}

use WebSocket\Client;

$client = new Client("ws://178.79.181.157:8181");
$client->send(getMessage());

?>