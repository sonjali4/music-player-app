const { app, BrowserWindow, ipcMain } = require("electron");
const path = require("node:path");

let mainWindow;

const createWindow = () => {
    mainWindow = new BrowserWindow({
        title: 'Music Player',
        width: 300,
        height: 450,
        frame: false,
        resizable: false,
        webPreferences: {
            preload: path.join(__dirname, 'preload.js'),
            contextIsolation: true,
            nodeIntegration: true
        }
    });

    mainWindow.loadFile(path.join(__dirname, './renderer/index.html'));
}

app.whenReady().then(() => {
    createWindow();

    app.on('activate', () => {
        if (BrowserWindow.getAllWindows().length === 0) {
            createWindow()
        }
      })

    ipcMain.on("minimize-window", () => {
        console.log("🔹 minimize-window event received in main.js");
        if (mainWindow) {
            mainWindow.minimize();
        } else {
            console.log("mainWindow is undefined");
        }
    });

    ipcMain.on("close-window", () => {
        console.log("🔴 Closing window...");
        if (mainWindow) {
            mainWindow.close(); // Close the window
            app.quit()
        }
    });
});

app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') {
        app.quit()
    }
  })

