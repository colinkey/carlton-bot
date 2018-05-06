import React, { Component } from "react";
import "./App.css";

import Instructions from "./components/Instructions";
import SceneDisplay from "./components/SceneDisplay";

const electron = window.require("electron");

class App extends Component {
  state = {
    scenes: [
      {
        sceneName: "Benjamin",
        chatCommand: "!benjamin",
        active: true
      },
      {
        sceneName: "Jake",
        chatCommand: "!jake",
        active: false
      },
      {
        sceneName: "Greg",
        chatCommand: "!greg",
        active: true
      }
    ],
    bot: {
      active: false
    },
    social: {
      github: "http://github.com/colinkey",
      twitter: "http://twitter.com/ckey1010"
    },
    showingInstructions: true
  };

  toggleBotServer = () => {
    this.state.bot.active
      ? electron.ipcRenderer.send("stop-bot-server")
      : electron.ipcRenderer.send("start-bot-server");
    this.setState({
      ...this.state,
      bot: {
        ...this.state.bot,
        active: !this.state.bot.active
      }
    });
  };

  toggleInstructions = () => {
    this.state.showingInstructions
      ? electron.ipcRenderer.send("resize-window", "shrink")
      : electron.ipcRenderer.send("resize-window", "expand");
    this.setState({
      showingInstructions: !this.state.showingInstructions
    });
  };

  componentDidMount() {
    electron.ipcRenderer.on("bot-server-status", (event, arg) => console.log(arg));
    electron.ipcRenderer.on("window-resized", (event, arg) => console.log(arg));
  }

  render() {
    return (
      <div className="App">
        {this.state.showingInstructions ? <Instructions /> : null}
        <div className="inner-container right-container">
          <div className="scenes">
            {this.state.scenes.map((scene, i) => <SceneDisplay key={i} sceneInfo={scene} />)}
          </div>
          <div className="scene-control-buttons">
            <button className="theme-button" onClick={this.toggleInstructions}>
              Toggle instructions
            </button>
            <button className="theme-button" onClick={this.toggleBotServer}>
              {this.state.bot.active ? "Stop" : "Start"} Bot!
            </button>
            <button className="new-scene theme-button">
              <i className="fa fa-plus fa-lg" aria-hidden="true" /> New Scene
            </button>
          </div>
        </div>
      </div>
    );
  }
}

export default App;
