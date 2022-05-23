import SockJs from "sockjs-client";

let StompJs = require('@stomp/stompjs');

export function connect(client, roomNum, update, setUpdate, setNewMessage, newMessage) {
    client.current = new StompJs.Client({
        // brokerURL: "ws://localhost:8080/api/ws", // 웹소켓 서버로 직접 접속하는 것
        webSocketFactory: () => { return new SockJs("http://localhost:8080/api/ws") },
        connectHeaders: {},
        debug: function (str) {
            console.log(str);
        },
        // reconnectDelay: 5000,
        heartbeatIncoming: 4000,
        heartbeatOutgoing: 4000,
    })

    client.current.onConnect = () => {
        subscribe(client, roomNum, update, setUpdate, setNewMessage, newMessage);
        
    }

    client.current.onStompError = function (frame) {
        console.log('Broker reported error: ' + frame.headers['message']);
        console.log('Additional details: ' + frame.body);
    };

    client.current.activate();
}

function subscribe(client, roomNum, update, setUpdate, setNewMessage, newMessage) {

    client.current.subscribe("/sub/room/" + roomNum, function (chat) {

        if (chat.body) {

            let message = JSON.parse(chat.body).message || false
            let result = JSON.parse(chat.body).result || false

            result == 'done'
                || (message.indexOf('입장했습니다.') != -1)
                || (message.indexOf('퇴장했습니다.') != -1)
                ? setUpdate(!update)
                : setNewMessage(newMessage => [...newMessage, JSON.parse(chat.body)])

        } else {
            alert('got empty message!')
        }
    }
    )
};

export function disConnect(client) {
    client.current.deactivate();
};