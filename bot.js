const tmi = require('tmi.js')
const exec = require('child_process').exec
const scenes = require('./activeScenes.js')
const creds = require('./.creds.json')
const social = require('./social.js')

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

// const client = new tmi.client(options)

// client.connect()

// client.on('connected', function(address, port) {
//     client.action(creds.twitch.channel, 'Ready to serve.')
// })

// client.on('chat', function(channel, userstate, message, self) {
//     switch(message) {
//         case '!morework':
//         client.action(channel, 'Me not dat kind of orc')
//         break

//         case '!twitter':
//         client.action(channel, social.twitter)
//         break

//         case '!github':
//         client.action(channel, social.github)
//         break

//         case scenes.Scene1.chatCommand:
//         client.action(channel, AHKSwtichScene(scenes.Scene1))
//         break

//         case scenes.Scene2.chatCommand:
//         client.action(channel, AHKSwtichScene(scenes.Scene2))
//         break

//         case scenes.Scene3.chatCommand:
//         client.action(channel, AHKSwtichScene(scenes.Scene3))
//         break

//     }
// })

function AHKSwtichScene(obj) {
    if (obj.active == false) {
        return obj.label + ' is not active or available for scene switching'
    } else {
        switch(obj.label) {
            case 'Jake':
            callAHK('start scripts/scene-switch-' + obj.label + '.ahk')
            return 'Switched to ' + obj.label

            case 'Benjamin':
            callAHK('start scripts/scene-switch-' + obj.label + '.ahk')
            return 'Switched to ' + obj.label
            
            case 'Greg':
            callAHK('start scripts/scene-switch-' + obj.label + '.ahk')
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
    let child = exec('start scripts/iniwriter.ahk', (error, stdout, stderr) => {
        if (error) {
            throw error
        }
        console.log(stdout)
    })
}