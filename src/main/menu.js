import { Menu, MenuItem } from 'electron';
// import { autoUpdater } from 'electron-updater';
import { openLogsDirectory, resetApp, takeScreenshot } from './utils.js';

export default class MenuBuilder {
  checkForUpdatesMenuItem;
  updateAvailableMenuItem;
  updateReadyForInstallMenuItem;
  menubar;

  constructor(menubar) {
    this.menubar = menubar;

    this.checkForUpdatesMenuItem = new MenuItem({
      label: 'Check for updates',
      enabled: true,
      click: () => {
        // autoUpdater.checkForUpdatesAndNotify();
      },
    });

    this.updateAvailableMenuItem = new MenuItem({
      label: 'An update is available',
      enabled: false,
      visible: false,
    });

    this.updateReadyForInstallMenuItem = new MenuItem({
      label: 'Restart to update',
      visible: false,
      click: () => {
        // autoUpdater.quitAndInstall();
      },
    });
  }

  buildMenu() {
    const contextMenu = Menu.buildFromTemplate([
      this.checkForUpdatesMenuItem,
      this.updateAvailableMenuItem,
      this.updateReadyForInstallMenuItem,
      { type: 'separator' },
      {
        label: 'Developer',
        submenu: [
          {
            role: 'reload',
            accelerator: 'CommandOrControl+R',
          },
          {
            role: 'toggleDevTools',
            accelerator:
              process.platform === 'darwin' ? 'Alt+Cmd+I' : 'Ctrl+Shift+I',
          },
          {
            label: 'Take Screenshot',
            accelerator: 'CommandOrControl+S',
            click: () => takeScreenshot(this.menubar),
          },
          {
            label: 'View Application Logs',
            click: () => openLogsDirectory(),
          },
          {
            label: 'Reset App',
            click: () => {
              resetApp(this.menubar);
            },
          },
        ],
      },
      { type: 'separator' },
      {
        label: 'Quit MXToolKit',
        accelerator: 'CommandOrControl+Q',
        click: () => {
          this.menubar.app.quit();
        },
      },
    ]);

    return contextMenu;
  }

  setCheckForUpdatesMenuEnabled(enabled) {
    this.checkForUpdatesMenuItem.enabled = enabled;
  }

  setUpdateAvailableMenuEnabled(enabled) {
    this.updateAvailableMenuItem.enabled = enabled;
  }

  setUpdateReadyForInstallMenuEnabled(enabled) {
    this.updateReadyForInstallMenuItem.enabled = enabled;
  }

  isUpdateAvailableMenuVisible() {
    return this.updateAvailableMenuItem.visible;
  }
}
