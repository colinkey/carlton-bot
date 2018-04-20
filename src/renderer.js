//TODO: MAKE SENSE OF THIS NONSENSE

const sceneContainer = document.querySelector(".scenes");
const calibrateButton = document.querySelector(".calibrate");
const newSceneButton = document.querySelector(".new-scene");
const exec = require("child_process").exec;
const Store = require("./store.js");
const { remote } = require("electron");
const OBSWebSocket = require("obs-websocket-js");

const store = new Store({
  configName: "user-preferences",
  defaults: {
    scenes: [
      {
        label: "One",
        chatCommand: "!one",
        active: true
      },
      {
        label: "Two",
        chatCommand: "!two",
        active: false
      },
      {
        label: "Three",
        chatCommand: "!three",
        active: false
      }
    ]
  }
});

const obs = new OBSWebSocket();
obs
  .connect({
    address: "localhost:4444"
  })
  .then(() => {
    console.log(`Success! We're connected & authenticated.`);

    return obs.getSceneList();
  })
  .then(data => {
    console.log(`${data.scenes.length} Available Scenes!`);

    data.scenes.forEach(scene => {
      if (scene.name !== data.currentScene) {
        console.log(`Found a different scene! Switching to Scene: ${scene.name}`);

        obs.setCurrentScene({ "scene-name": scene.name });
      }
    });
  })
  .catch(err => {
    // Promise convention dicates you have a catch on every chain.
    console.log(err);
  });

let data;

function getData() {
  data = store.get("scenes");
}

function renderScenes() {
  getData();
  sceneContainer.innerHTML = "";
  for (var i = 0; i < data.length; i++) {
    let newDiv = document.createElement("div");
    newDiv.className = "scene-container";
    newDiv.innerHTML =
      '<div class="scene-info"><p class="scene-index">Scene ' +
      (i + 1) +
      '</p> \
        <h2 class="scene-label">' +
      data[i].label +
      '</h2> \
        <p class="scene-chat-command">Chat command: ' +
      data[i].chatCommand +
      '</p> \
        </div> \
        <div class="scene-actions"> \
        <i class="fa fa-check fa-lg active-checkbox" aria-hidden="true" style="color: lightgrey;"></i>  \
        <i class="fa fa-pencil fa-lg" aria-hidden="true"></i>  \
        <i class="fa fa-ban fa-lg delete-icon" aria-hidden="true" style="color: red;"></i>  \
        </div>';
    let check = newDiv.querySelector(".active-checkbox");
    if (data[i].active) {
      check.style.color = "green";
    }
    sceneContainer.appendChild(newDiv);
  }
}

function calibrateScenes() {
  console.log("yes");
  let child = exec("start scripts/iniwriter.ahk", (error, stdout, stderr) => {
    if (error) {
      throw error;
    }
    console.log(stdout);
  });
}

function deleteScene() {
  console.log("delete");
}

function addScene() {
  console.log("add");
  openSceneModal();
  let modalButton = document.querySelector(".modal-add-scene");
  // modalButton.addEventListener('click', closeModal())
  console.log(modalButton);
  // store.set(scenes, {name, command})
  renderScenes();
}

calibrateButton.addEventListener("click", calibrateScenes);
newSceneButton.addEventListener("click", addScene);
renderScenes();

function openSceneModal() {
  let win = new remote.BrowserWindow({
    parent: remote.getCurrentWindow(),
    modal: true,
    width: 300,
    height: 300,
    closable: true
  });
  var theUrl = "file://" + __dirname + "/new-scene-modal.html";
  win.loadURL(theUrl);
}

function closeModal() {
  let window = remote.getCurrentWindow();
  window.close();
}
