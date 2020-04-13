const { app, BrowserWindow } = require ('electron');


const createWindow =  () => {
  // Create the browser window.
  let win = new BrowserWindow({
    width: 320,
    height: 547,
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