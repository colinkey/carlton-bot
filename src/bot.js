const tmi = require("tmi.js");
const exec = require("child_process").exec;
const creds = require("./.creds.json");
const OBSWebSocket = require("obs-websocket-js");

const obs = new OBSWebSocket();
obs.connect({
  address: "localhost:4444"
});

function switchToScene(sceneName) {
  obs.setCurrentScene({ "scene-name": sceneName });
  return `Switching to ${sceneName}`;
}

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

    case "!adrian":
      client.action(channel, switchToScene("Yo Adrian"));
      break;

    case "!two":
      client.action(channel, switchToScene("Scene 2"));
      break;

    case "!og":
      client.action(channel, switchToScene("Scene"));
      break;
  }
});
