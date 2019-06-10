const electron = require('electron');
const mongoose = require('mongoose');
const path = require('path');
const {start , stop} = require('./monitor');
const {app ,BrowserWindow,ipcMain} = electron;

mongoose.connect('mongodb://localhost:27017/Stock', {useNewUrlParser:true})
    .then(() => console.log('Database Connected'))
        .catch(err => console.log(err));

let mainWindow;  
 
const createWindow = () => {
        mainWindow = new BrowserWindow({
        frame:false,
        width:450 , 
        height:550,
        resizable:false,
        webPreferences:{
            nodeIntegration: true
        },
     })
       mainWindow.loadFile(path.join(__dirname + './src/index.html'));
}

ipcMain.on('alert',()=>{
    app.exit();
})


ipcMain.on('start',() =>{
     start();
     mainWindow.webContents.send('update' , "Monitor Running...");
    });

ipcMain.on('stop',()=>{
    stop();
    mainWindow.webContents.send('update',"Stopping Monitor...");
})

app.on('ready', createWindow);
