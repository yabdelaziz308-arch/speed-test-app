import { app, BrowserWindow } from 'electron';
import path from 'path';
import { fileURLToPath } from 'url';

const isDev = !app.isPackaged;

app.commandLine.appendSwitch('no-sandbox');
app.commandLine.appendSwitch('ozone-platform-hint', 'auto');

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

function createWindow() {
  const mainWindow = new BrowserWindow({
    width: 1024,
    height: 768,
    minWidth: 800,
    minHeight: 600,
    icon: path.join(__dirname, 'public/icon.png'),
    webPreferences: {
      nodeIntegration: true,
      contextIsolation: false,
    },
    title: "SpeedPulse Desktop"
  });

  const devUrl = 'http://localhost:5173';

  if (isDev) {
    mainWindow.loadURL(devUrl).catch(() => {
      // If dev server isn't running, fallback to built dist/index.html
      mainWindow.loadFile(path.join(__dirname, 'dist/index.html'));
    });

    mainWindow.webContents.on('did-fail-load', (event, errorCode) => {
      if (errorCode === -102) {
        mainWindow.loadFile(path.join(__dirname, 'dist/index.html')).catch(() => {});
      }
    });
  } else {
    mainWindow.loadFile(path.join(__dirname, 'dist/index.html'));
  }

  mainWindow.setMenuBarVisibility(!isDev);
}

app.whenReady().then(() => {
  createWindow();

  app.on('activate', function () {
    if (BrowserWindow.getAllWindows().length === 0) createWindow();
  });
});

app.on('window-all-closed', function () {
  if (process.platform !== 'darwin') app.quit();
});
