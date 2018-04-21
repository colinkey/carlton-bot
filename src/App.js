import React, { Component } from "react";
import "./App.css";

import SceneDisplay from "./components/SceneDisplay";

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
    }
  };

  startBotServer = () => {
    this.setState({
      ...this.state,
      bot: {
        ...this.state.bot,
        active: !this.state.bot.active
      }
    });
  };

  render() {
    return (
      <div className="App">
        <div className="outer-container">
          <div className="inner-container left-container">
            <div className="title-container">
              <h1 className="purple">Hi, I'm Carlton</h1>
              <button className="power-button" onClick={this.startBotServer}>
                {this.state.bot.active ? "Stop" : "Start"} Bot!
              </button>
              <h2>I'm in ur chat, switchin' ur scenes.</h2>
              <p>(and telling jokes from 2005)</p>
            </div>
            <div className="basic-instructions">
              <h2 className="purple">How-to</h2>
              <p>Set up your scenes on the right! Here's a quick rundown of your options:</p>
              <ul>
                <li>
                  The <strong>Label</strong> is your name for the scene (sync it up with your OBS
                  scene for clarity!)
                </li>
                <li>
                  Use the <strong>Active</strong> icon (<i
                    className="fa fa-check fa-lg"
                    aria-hidden="true"
                    style={{ color: "green" }}
                  />) to tell me if that scene is available for switchin'
                </li>
                <li>
                  You'll need to <strong>Calibrate</strong> your scenes before I can switch them. Do
                  this by selecting <strong>Calibrate</strong> (<i
                    className="fa fa-crosshairs fa-lg"
                    aria-hidden="true"
                  />) and left-clicking the scene in OBS while holding down the CTRL key.
                </li>
                <li>
                  For additional settings, look under the{" "}
                  <i className="fa fa-cog fa-lg" aria-hidden="true" /> icon.
                </li>
              </ul>
            </div>
          </div>
          <div className="inner-container right-container">
            <div className="scenes">
              {this.state.scenes.map((scene, i) => <SceneDisplay key={i} sceneInfo={scene} />)}
            </div>
            <div className="scene-control-buttons">
              <button className="calibrate scene-button">
                <i className="fa fa-crosshairs fa-lg" aria-hidden="true" /> Calibrate
              </button>
              <button className="new-scene scene-button">
                <i className="fa fa-plus fa-lg" aria-hidden="true" /> New Scene
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default App;
