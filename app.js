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
  win = new BrowserWindow({width: 800, height: 600, autoHideMenuBar: true, title: "Carlton"})

  win.loadURL(url.format({
    pathname: path.join(__dirname, 'index.html'),
    protocol: 'file:',
    slashes: true
  }))

  // Emitted when the window is closed.
  win.on('closed', () => {
    // Dereference the window object, usually you would store windows
    // in an array if your app supports multi windows, this is the time
    // when you should delete the corresponding element.
    win = null
  })
}

app.on('ready', createWindow)

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit()
  }
})

app.on('activate', () => {
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

function calibrateScenes() {
    let child = exec('start iniwriter.ahk', (error, stdout, stderr) => {
        if (error) {
            throw error
        }
        console.log(stdout)
    })
}