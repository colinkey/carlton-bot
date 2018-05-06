const electron = require("electron");
// Module to control application life.
const app = electron.app;
// Module to create native browser window.
const BrowserWindow = electron.BrowserWindow;

const path = require("path");
const url = require("url");

const childProcess = require("child_process");
// const bot = require("./src/bot.js");

// Keep a global reference of the window object, if you don't, the window will
// be closed automatically when the JavaScript object is garbage collected.
let mainWindow;

let botPID;

function createWindow() {
  // Create the browser window.
  mainWindow = new BrowserWindow({ width: 800, height: 600 });

  // and load the index.html of the app.
  mainWindow.loadURL("http://localhost:3000/home");

  // Open the DevTools.
  mainWindow.webContents.openDevTools();

  // Emitted when the window is closed.
  mainWindow.on("closed", function() {
    // Dereference the window object, usually you would store windows
    // in an array if your app supports multi windows, this is the time
    // when you should delete the corresponding element.
    mainWindow = null;
  });

  electron.ipcMain.on("resize-window", (event, arg) => {
    if (arg === "expand") {
      resizeWindow(mainWindow, { width: 800, height: 600 });
      mainWindow.send("window-resized", "Window set to 800x600");
    } else if (arg === "shrink") {
      resizeWindow(mainWindow, { width: 400, height: 600 });
      mainWindow.send("window-resized", "Window set to 400x600");
    } else {
      throw Error("Received resize-window message with invalid argument");
    }
  });

  electron.ipcMain.on("start-bot-server", event => {
    startBotServer(`node`, [`${app.getAppPath()}\\src\\botClient.js`]);
    mainWindow.send("bot-server-status", "Bot Started!");
  });

  electron.ipcMain.on("stop-bot-server", event => {
    stopBotServer();
    mainWindow.send("bot-server-status", "Bot Stopped!");
  });
}
// TODO: This is only need to allow for OBS to display the window. Known bug in Chrome. Leave it or not?
app.disableHardwareAcceleration();

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.on("ready", createWindow);

// Quit when all windows are closed.
app.on("window-all-closed", function() {
  // On OS X it is common for applications and their menu bar
  // to stay active until the user quits explicitly with Cmd + Q
  if (process.platform !== "darwin") {
    app.quit();
  }
});

app.on("activate", function() {
  // On OS X it's common to re-create a window in the app when the
  // dock icon is clicked and there are no other windows open.
  if (mainWindow === null) {
    createWindow();
  }
});

// In this file you can include the rest of your app's specific main process
// code. You can also put them in separate files and require them here.

function startBotServer(command, args) {
  const child = childProcess.spawn(command, args);
  botPID = child.pid;
}

function stopBotServer() {
  process.kill(botPID);
}

function resizeWindow(window, size) {
  window.setSize(size.width, size.height);
}
