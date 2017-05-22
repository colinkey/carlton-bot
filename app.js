const tmi = require('tmi.js')
const exec = require('child_process').exec
const scenes = require('./activeScenes.js')
const creds = require('./.creds.json')
const social = require('./social.js')
const { app, BrowserWindow } = require('electron')
const path = require('path')
const url = require('url')

const options = {
    options: {
        debug: true
    },
    connection: {
        reconnect: true
    },
    identity: {
        username: creds.twitch.username,
        password: creds.twitch.token
    },
    channels:[creds.twitch.channel]
}

const client = new tmi.client(options)

let win

function createWindow () {
  // Create the browser window.
  win = new BrowserWindow({width: 800, height: 600})

  // and load the index.html of the app.
  win.loadURL(url.format({
    pathname: path.join(__dirname, 'index.html'),
    protocol: 'file:',
    slashes: true
  }))

  // Open the DevTools.
  win.webContents.openDevTools()

  // Emitted when the window is closed.
  win.on('closed', () => {
    // Dereference the window object, usually you would store windows
    // in an array if your app supports multi windows, this is the time
    // when you should delete the corresponding element.
    win = null
  })
}

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.on('ready', createWindow)

// Quit when all windows are closed.
app.on('window-all-closed', () => {
  // On macOS it is common for applications and their menu bar
  // to stay active until the user quits explicitly with Cmd + Q
  if (process.platform !== 'darwin') {
    app.quit()
  }
})

app.on('activate', () => {
  // On macOS it's common to re-create a window in the app when the
  // dock icon is clicked and there are no other windows open.
  if (win === null) {
    createWindow()
  }
})

client.connect()

client.on('connected', function(address, port) {
    client.action(creds.twitch.channel, 'Ready to serve.')
})

client.on('chat', function(channel, userstate, message, self) {
    switch(message) {
        case '!morework':
        client.action(channel, 'Me not dat kind of orc')
        break

        case '!twitter':
        client.action(channel, social.twitter)
        break

        case '!github':
        client.action(channel, social.github)
        break

        case scenes.Scene1.chatCommand:
        client.action(channel, AHKSwtichScene(scenes.Scene1))
        break

        case scenes.Scene2.chatCommand:
        client.action(channel, AHKSwtichScene(scenes.Scene2))
        break

        case scenes.Scene3.chatCommand:
        client.action(channel, AHKSwtichScene(scenes.Scene3))
        break

    }
})

function AHKSwtichScene(obj) {
    if (obj.active == false) {
        return obj.label + ' is not active or available for scene switching'
    } else {
        switch(obj.label) {
            case 'Jake':
            callAHK('start scene-switch-' + obj.label + '.ahk')
            return 'Switched to ' + obj.label

            case 'Benjamin':
            callAHK('start scene-switch-' + obj.label + '.ahk')
            return 'Switched to ' + obj.label
            
            case 'Greg':
            callAHK('start scene-switch-' + obj.label + '.ahk')
            return 'Switched to ' + obj.label
        }
    }
}

function callAHK(path) {
    let child = exec(path, (error, stdout, stderr) => {
        if (error) {
            throw error
        }
        console.log(stdout)
    })
}


