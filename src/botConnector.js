const OBSWebSocket = require("obs-websocket-js");
const creds = require("./.creds.json");

class BotConnector {
  constructor() {
    this.obs = new OBSWebSocket();
  }

  connect() {
    this.obs.connect({
      address: "localhost:4444",
      password: creds.obs.password
    });
    this.getListOfScenes();
  }

  switchToScene(sceneName) {
    this.obs.setCurrentScene({ "scene-name": sceneName });
    return `Switching to ${sceneName}`;
  }

  getListOfScenes() {
    let scenes;
    this.obs.getSceneList().then(data => {
      scenes = data.scenes;
    });
    return `${scenes.length} scenes available`;
  }
}

module.exports = BotConnector;
