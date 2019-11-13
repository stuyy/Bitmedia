const { EventEmitter } = require('events');

class ServerHandler extends EventEmitter {
    constructor() {
        super();
    }
    emailSendEvent(email) {
        this.emit('onEmailSend', email);
    }
}

module.exports = new ServerHandler();