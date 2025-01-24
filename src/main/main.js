import { app, globalShortcut, ipcMain as ipc, nativeTheme, screen, BrowserWindow, Tray, Menu } from "electron";
import log from 'electron-log';
import { menubar } from 'menubar';
import path from "path";

import { onFirstRunMaybe } from './first-run.js';
import { TrayIcons } from './icons.js';
import MenuBuilder from './menu.js';

log.initialize();

const browserWindowOptions = {
  width: 500,
  height: 400,
  minWidth: 500,
  minHeight: 400,
  resizable: false,
  skipTaskbar: true,
  webPreferences: {
    enableRemoteModule: true,
    nodeIntegration: true,
    contextIsolation: false,
  },
};

const menuBar = menubar({
  icon: TrayIcons.idle,
  index: `http://localhost:3000`,
  browserWindow: browserWindowOptions,
  preloadWindow: true,
  showDockIcon: false,
});

const menuBuilder = new MenuBuilder(menuBar);
const contextMenu = menuBuilder.buildMenu();

// new Updater(menuBar, menuBuilder);

let shouldUseAlternateIdleIcon = false;

app.whenReady().then(async () => {
  await onFirstRunMaybe();

  menuBar.on('ready', () => {
    menuBar.app.setAppUserModelId('com.electron.chadtoolz');
    
    menuBar.tray.setToolTip('CHADTOOLZ');
    menuBar.tray.setIgnoreDoubleClickEvents(true);
    menuBar.tray.on('right-click', (_event, bounds) => {
      menuBar.tray.popUpContextMenu(contextMenu, bounds);
    });

    menuBar.window.webContents.on('before-input-event', (event, input) => {
      if (input.key === 'Escape') {
        menuBar.window.hide();
        event.preventDefault();
      }
    });

    menuBar.window.webContents.on('devtools-opened', (_event, input) => {
      menuBar.window.setSize(800, 600);
      menuBar.window.center();
      menuBar.window.resizable = true;
      menuBar.window.setAlwaysOnTop(true);
    });

    menuBar.window.webContents.on('devtools-closed', (_event, input) => {
      const trayBounds = menuBar.tray.getBounds();
      menuBar.window.setSize(browserWindowOptions.width, browserWindowOptions.height);
      menuBar.positioner.move('trayCenter', trayBounds);
      menuBar.window.resizable = false;
    });
  });

  nativeTheme.on('updated', () => {
    if (nativeTheme.shouldUseDarkColors) {
      menuBar.window.webContents.send('chadtoolz:update-theme', 'DARK');
    } else {
      menuBar.window.webContents.send('chadtoolz:update-theme', 'LIGHT');
    }
  });

  ipc.handle('chadtoolz:version', () => app.getVersion());
  ipc.on('chadtoolz:window-show', () => menuBar.showWindow());
  ipc.on('chadtoolz:window-hide', () => menuBar.hideWindow());
  ipc.on('chadtoolz:quit', () => menuBar.app.quit());
  ipc.on('chadtoolz:use-alternate-idle-icon', (_, useAlternateIdleIcon) => {
    shouldUseAlternateIdleIcon = useAlternateIdleIcon;
  });
  ipc.on('chadtoolz:icon-active', () => {
    if (!menuBar.tray.isDestroyed()) {
      menuBar.tray.setImage(
        menuBuilder.isUpdateAvailableMenuVisible()
          ? TrayIcons.activeUpdateIcon
          : TrayIcons.active,
      );
    }
  });

  ipc.on('chadtoolz:icon-idle', () => {
    if (!menuBar.tray.isDestroyed()) {
      if (shouldUseAlternateIdleIcon) {
        menuBar.tray.setImage(
          menuBuilder.isUpdateAvailableMenuVisible()
            ? TrayIcons.idleAlternateUpdateIcon
            : TrayIcons.idleAlternate,
        );
      } else {
        menuBar.tray.setImage(
          menuBuilder.isUpdateAvailableMenuVisible()
            ? TrayIcons.idleUpdateIcon
            : TrayIcons.idle,
        );
      }
    }
  });

  ipc.on('chadtoolz:update-title', (_, title) => {
    if (!menuBar.tray.isDestroyed()) {
      menuBar.tray.setTitle(title);
    }
  });

  ipc.on(
    'chadtoolz:update-keyboard-shortcut',
    (_, { enabled, keyboardShortcut }) => {
      if (!enabled) {
        globalShortcut.unregister(keyboardShortcut);
        return;
      }

      globalShortcut.register(keyboardShortcut, () => {
        if (menuBar.window.isVisible()) {
          menuBar.hideWindow();
        } else {
          menuBar.showWindow();
        }
      });
    },
  );

  ipc.on('chadtoolz:update-auto-launch', (_, settings) => {
    app.setLoginItemSettings(settings);
  });
});

// let mainWindow;
// let tray;
// app.on("ready", () => {
//   mainWindow = new BrowserWindow({
//     width: 1200,
//     height: 800,
//     webPreferences: {
//       // preload: path.join(__dirname, "preload.js"),
//       contextIsolation: true,
//       enableRemoteModule: false,
//     },
//   });

//   mainWindow.loadURL("http://localhost:3001");

//   tray = new Tray();
//   tray.setToolTip("CHADTOOLZ");

//   // Set context menu for the tray icon
//   const contextMenu = Menu.buildFromTemplate([
//     {
//       label: "Show App",
//       click: () => {
//         mainWindow.show();
//       },
//     },
//     {
//       label: "Quit",
//       click: () => {
//         app.quit();
//       },
//     },
//   ]);

//   tray.setContextMenu(contextMenu);

//   // Show the app window when the tray icon is clicked
//   tray.on("click", () => {
//     if (mainWindow.isVisible()) {
//       mainWindow.hide();
//     } else {
//       mainWindow.setBounds(getWindowPosition()); // Position the window near the tray icon
//       mainWindow.show();
//     }
//   });
  
// });

// // Quit the app when all windows are closed (except on macOS)
// app.on('window-all-closed', () => {
//   if (process.platform !== 'darwin') {
//     app.quit();
//   }
// });

// // Utility function to position the window near the tray icon
// function getWindowPosition() {
//   const trayBounds = tray.getBounds();
//   const display = screen.getPrimaryDisplay();
//   const { width } = mainWindow.getBounds();

//   // Center the window below the tray icon
//   const x = Math.round(trayBounds.x + trayBounds.width / 2 - width / 2);
//   const y = display.workArea.y + trayBounds.height + 5;

//   return { x, y, width, height: mainWindow.getBounds().height };
// }
