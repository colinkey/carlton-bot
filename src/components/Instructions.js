import React from "react";

const Instructions = props => (
  <div className="inner-container left-container">
    <div className="title-container">
      <h1 className="purple">Hi, I'm Carlton</h1>
      <h2>I'm in ur chat, switchin' ur scenes.</h2>
      <p>(and telling jokes from 2005)</p>
    </div>
    <div className="basic-instructions">
      <h2 className="purple">How-to</h2>
      <p>Set up your scenes on the right! Here's a quick rundown of your options:</p>
      <ul>
        <li>
          The <strong>Label</strong> is your name for the scene (sync it up with your OBS scene for
          clarity!)
        </li>
        <li>
          Use the <strong>Active</strong> icon (<i
            className="fa fa-check fa-lg"
            aria-hidden="true"
            style={{ color: "green" }}
          />) to tell me if that scene is available for switchin'
        </li>
        <li>
          For additional settings, look under the{" "}
          <i className="fa fa-cog fa-lg" aria-hidden="true" /> icon.
        </li>
      </ul>
    </div>
  </div>
);

export default Instructions;
