import React from "react";

const SceneDisplay = props => (
  <div className="scene-container">
    <div className="scene-info">
      <h2 className="scene-label">{props.sceneInfo.sceneName}</h2>
      <p className="scene-chat-command">Chat command: {props.sceneInfo.chatCommand}</p>
    </div>
    <div className="scene-actions">
      <i
        className="fa fa-check fa-lg active-checkbox"
        aria-hidden="true"
        style={{ color: "lightgrey" }}
      />
      <i className="fa fa-edit fa-lg" aria-hidden="true" style={{ color: "lightgrey" }} />
      <i className="fa fa-ban fa-lg delete-icon" aria-hidden="true" style={{ color: "red" }} />
    </div>
  </div>
);

export default SceneDisplay;
