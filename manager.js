'use strict';

const Winston = require('winston');
const log = new Winston.Logger({
    name: 'bot_manager_log',
    transports: [new Winston.transports.Console({
        timestamp: true,
        colorize: true,
        level: process.env.loglevel || 'info'
    })]
});

const Bot = require('./bot/bot.js');
const agent_config = require('./config/config.js')[process.env.LP_ACCOUNT][process.env.LP_USER];

/**
 * The manager bot starts in the Away state and subscribes to all conversations
 *
 * Bot configuration is set via a config file (see config/example_config.js)
 * and environment variables LP_ACCOUNT and LP_USER
 *
 * @type {Bot}
 */

const manager = new Bot(agent_config, 'AWAY', true);

manager.on(Bot.const.CONNECTED, data => {
    log.info(`[manager.js] CONNECTED ${JSON.stringify(data)}`);
});

manager.on(Bot.const.ROUTING_NOTIFICATION, data => {
    log.info(`[manager.js] ROUTING_NOTIFICATION ${JSON.stringify(data)}`);
});

manager.on(Bot.const.CONVERSATION_NOTIFICATION, event => {
    log.info(`[manager.js] CONVERSATION_NOTIFICATION ${JSON.stringify(event)}`);

    // Iterate through notifications
    event.changes.forEach(change => {
        // If I'm not already a participant, join as a manager
        if (!manager.getRole(change.result.conversationDetails)) { manager.joinConversation(change.result.convId, 'MANAGER') }
    });
});

manager.on(Bot.const.AGENT_STATE_NOTIFICATION, event => {
    log.info(`[manager.js] AGENT_STATE_NOTIFICATION ${JSON.stringify(event)}`);
});

manager.on(Bot.const.CONTENT_NOTIFICATION, event => {
    log.info(`[manager.js] CONTENT_NOTIFICATION ${JSON.stringify(event)}`);
});

manager.on(Bot.const.SOCKET_CLOSED, event => {
    log.info(`[manager.js] SOCKET_CLOSED ${JSON.stringify(event)}`);
});

manager.on(Bot.const.ERROR, error => {
    log.error(`[manager.js] ERROR ${JSON.stringify(error)}`);
});