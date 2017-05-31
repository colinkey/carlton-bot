const scenes = require('./activeScenes.js')
const sceneContainer = document.querySelector('.right-container')

for (var i = 0; i < scenes.length; i++) {
    let newDiv = document.createElement('div')
    newDiv.className = 'scene-container'
    newDiv.innerHTML = '<div class="scene-info"><p class="scene-index">Scene ' + (i + 1) + '</p> \
    <h2 class="scene-label">' + scenes[i].label + '</h2> \
    <p class="scene-chat-command">Chat command: ' + scenes[i].chatCommand + '</p> \
    </div> \
    <div class="scene-actions"> \
    <i class="fa fa-check fa-lg active-checkbox" aria-hidden="true" style="color: lightgrey;"></i>  \
    <i class="fa fa-ban fa-lg" aria-hidden="true" style="color: red;"></i>  \
    </div>'
    let check = newDiv.querySelector('.active-checkbox')
    if (scenes[i].active) {
        check.setAttribute('checked', '')
        check.style.color = "green"
    }
    sceneContainer.appendChild(newDiv)
}
