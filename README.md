# Running The Sample Apps

The best way to use the SDK is to extend the Agent class with your own logic and then instantiate this object in your projects. The included samples all rely on a [sample `Bot` class][1] that extends `Agent`.

In all examples the bot's login credentials are loaded from the `config/config.js` file according to environment variables `LP_ACCOUNT` & `LP_USER` specifying which account and user's credentials to use.

- [Pre-requisites](#global-pre-requisites)
- [Agent Example](#agent-example)
- [Reader Example](#reader-example)
- [Manager Example](#manager-example)
- [Running in Heroku](#running-in-heroku)

### Global Pre-requisites
- A LivePerson Account with Messaging
- A `config/config.js` file that exports a configuration object (see [`config/example_config.js`][5])

## [Agent Example][2]
#### Description
This is an example of a bot acting as an Agent. It starts in the `ONLINE` state and subscribes only to updates for its own conversations. It receives new conversations by subscribing to `routingTaskNotification` events which indicate that new conversations have entered the relevant skill queue and are "ringing" to the bot. The bot consumes these routing events and accepts all incoming conversations, thereby joining with the role `ASSIGNED_AGENT`.

This bot then takes various actions in response to messages from the visitor:

- If the visitor says "time" or "date" the bot will respond with the relevant information (local time of bot system)
- If the visitor says "content" the bot will send a structured content object.
  - Further information about creating valid structured content objects can be found [here][7]
- If the visitor says "transfer" the bot will transfer the conversation to the configured transferSkill.
  - In order for the bot to successfully transfer conversations to a new skill you must set the value of [`transferSkill`][6] in `agent.js` to a string matching the Skill ID of the target skill. You can obtain your skill ID using the [Skills API][8].
- If the visitor says "close" the bot will close the conversation
- Anything else the visitor says the bot will simply repeat back to the visitor prefixed with 'you said '.

#### Pre-requisites
- A user with the Agent role
- (Optional) `transferSkill` set in `agent.js`

#### Running the Agent Example

   ```sh
   LP_ACCOUNT=(account name) LP_USER=(login name) node agent.js
   ```


## [Reader Example][3]
This is an example of a bot acting as a Reader. It starts in the `AWAY` state so that no conversations will "ring" to it, but it subscribes to updates for all conversations on the account. When any new conversation begins the bot adds itself as a participant with the role `READER`. This role is appropriate for bots which need to see chat lines and and metadata about the consumer and the agent assigned to the conversation (whether human or bot) but do not need to participate in the conversation in any way.

#### Pre-requisites
- A user with Agent role and the "Join another agent's conversation" permission

#### Running the Reader Example

   ```sh
   LP_ACCOUNT=(account name) LP_USER=(login name) node reader.js
   ```

## [Manager Example][4]
This is an example of a bot acting as a Manager. It starts in the `AWAY` state so that no conversations will "ring" to it, but it subscribes to updates for all conversations on the account. When any new conversation begins the bot adds itself as a participant with the role `MANAGER`. It then sends a message into the conversation stating that it has joined, which both the `ASSIGNED_AGENT` and the `CONSUMER` can see.

   
#### Pre-requisites
- A user with the Agent Manager role and the "Join agents' conversations" and "View agents' conversations" permissions

#### Running the Manager Example

   ```sh
   LP_ACCOUNT=(account name) LP_USER=(login name) node manager.js
   ```
   
## Running in Heroku
This project is ready to run the Agent sample in Heroku out of the box. Simply deselect the `web` dyno and select the `worker` dyno in Heroku's "Resources" tab, and specify the appropriate config vars in Heroku's "Settings" tab:

```
LP_ACCOUNTID or LP_ACCOUNT // required
LP_USERNAME or LP_USER // required for username/password authentication and OAuth1 authentication
LP_PASSWORD // required for username/password authentication
LP_TOKEN // required for token authentication
LP_USERID // required for token authentication
LP_ASSERTION // required for SAML authentication
LP_APPKEY // required for OAuth1 authentication
LP_SECRET // required for OAuth1 authentication
LP_ACCESSTOKEN // required for OAuth1 authentication
LP_ACCESSTOKENSECRET // required for OAuth1 authentication
```
   
[1]: /bot/bot.js
[2]: agent.js
[3]: reader.js
[4]: manager.js
[5]: /config/example_config.js
[6]: agent.js#L28
[7]: https://developers.liveperson.com/structured-content-templates.html
[8]: https://developers.liveperson.com/overview.html
[9]: https://github.com/donmanguno/node-agent-sdk#agent-class
