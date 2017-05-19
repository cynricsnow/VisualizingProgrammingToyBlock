'use strict'
const electron = require('electron');
const path = require('path');
const url = require('url');

const app = electron.app;
const BrowserWindow = electron.BrowserWindow;
let mainWindow;

const createWindow = () => {
  mainWindow = new BrowserWindow({
      width: 1920,
      height: 1080,
      webPreferences: {
          nodeIntegration: false
      }
  });
  mainWindow.loadURL('http://106.15.90.104:3000');
  mainWindow.on('closed', () => {
      mainWindow = null;
  });
}

app.on('ready', createWindow);
app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') {
        app.quit();
    }
});

app.on('activate', () => {
    if (mainWindow === null) {
        createWindow();
    }
});

require('./app.js');
