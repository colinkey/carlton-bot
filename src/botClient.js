const tmi = require("tmi.js");
const exec = require("child_process").exec;
const creds = require("./.creds.json");

const obsConnection = require("./botConnector.js");

const activeConnection = new obsConnection();

activeConnection.connect();

const options = {
  options: {
    debug: true
  },
  connection: {
    reconnect: true
  },
  identity: {
    username: creds.twitch.username,
    password: creds.twitch.token
  },
  channels: [creds.twitch.channel]
};

const client = new tmi.client(options);

client.connect();

client.on("connected", function(address, port) {
  client.action(creds.twitch.channel, "Ready to serve.");
});

client.on("chat", function(channel, userstate, message, self) {
  switch (message) {
    case "!morework":
      client.action(channel, "Me not dat kind of orc");
      break;

    case "!twitter":
      client.action(channel, "@ckey1010");
      break;

    case "!github":
      client.action(channel, "@colinkey");
      break;

    case "!code":
      client.action(channel, activeConnection.switchToScene("Code"));
      break;

    case "!carlton":
      client.action(channel, activeConnection.switchToScene("Carlton"));
      break;

    case "!workspace":
      client.action(channel, activeConnection.switchToScene("Workspace"));
      break;

    case "!scenelist":
      client.action(channel, activeConnection.getListOfScenes());
      break;
  }
});
