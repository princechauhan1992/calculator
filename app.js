const { app, BrowserWindow } = require ('electron');


const createWindow =  () => {
  // Create the browser window.
  let win = new BrowserWindow({
    width: 400,
    height: 645,
    webPreferences: {
      nodeIntegration: true
    }
  })

  // and load the index.html of the app.
  win.loadFile('index.html')
}

app.whenReady().then(createWindow);

app.on("window-all-closed", () => {
    app.quit();
  });