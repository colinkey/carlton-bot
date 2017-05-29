const scenes = require('./activeScenes.js')
const sceneContainer = document.querySelector('.right-container')

for (var i = 0; i < scenes.length; i++) {
    //create
    let newDiv = document.createElement('div')
    //className
    newDiv.className = 'scene-container'
    //innerHTML
    newDiv.innerHTML = '<div class="scene-info"><p class="scene-index">Scene' + i + '</p> \
    <h2 class="scene-label">' + scenes[i].label + '</h2> \
    <p class="scene-chat-command">Chat command: ' + scenes[i].chatCommand + '</p> \
    </div> \
    <div class="scene-actions"> \
    <input type="checkbox" name="scene-1-active"><label for="scene-1-active">Active?</label> \
    <button class="delete-scene scene-button" onclick="">delete scene</button> \
    </div>'
    sceneContainer.appendChild(newDiv)
}


console.log(scenes[1].label)