const sceneContainer = document.querySelector('.right-container')
const calibrateButton = document.querySelector('.calibrate')
const newSceneButton = document.querySelector('.new-scene')
const exec = require('child_process').exec
const Store = require('./store.js')

const store = new Store({
    configName: 'user-preferences',
    defaults: {
        scenes : [
            {
                label : "One",
                chatCommand : "!one",
                active : true
            },
            {
                label : "Two",
                chatCommand : "!two",
                active : false
            },
            {
                label : "Three",
                chatCommand : "!three",
                active : false
            }
        ]
    }
})

let data = store.get('scenes')

function renderScenes() {
    for (var i = 0; i < data.length; i++) {
        let newDiv = document.createElement('div')
        newDiv.className = 'scene-container'
        newDiv.innerHTML = '<div class="scene-info"><p class="scene-index">Scene ' + (i + 1) + '</p> \
        <h2 class="scene-label">' + data[i].label + '</h2> \
        <p class="scene-chat-command">Chat command: ' + data[i].chatCommand + '</p> \
        </div> \
        <div class="scene-actions"> \
        <i class="fa fa-check fa-lg active-checkbox" aria-hidden="true" style="color: lightgrey;"></i>  \
        <i class="fa fa-pencil fa-lg" aria-hidden="true"></i>  \
        <i class="fa fa-ban fa-lg delete-icon" aria-hidden="true" style="color: red;"></i>  \
        </div>'
        let check = newDiv.querySelector('.active-checkbox')
        if (data[i].active) { 
            check.style.color = "green"
        }
        sceneContainer.appendChild(newDiv)
    }
}

function showModal() {
    let modal = window.open('', 'child')
}


function calibrateScenes() {
    console.log('yes')
    let child = exec('start scripts/iniwriter.ahk', (error, stdout, stderr) => {
        if (error) {
            throw error
        }
        console.log(stdout)
    })
}

function deleteScene() {
    console.log('delete')

}

function addScene() {
    console.log('add')

    renderScenes()
}

calibrateButton.addEventListener('click', calibrateScenes)
newSceneButton.addEventListener('click', addScene)
renderScenes()
