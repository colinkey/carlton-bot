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
