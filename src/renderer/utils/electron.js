import { ipcRenderer, shell } from 'electron';
import { defaultSettings } from '../context/App';
import { OpenPreference } from '../consts';
import { CONSTANTS } from './constants';
import { loadState } from './storage';

export function openExternalLink(url) {
  if (url.toLowerCase().startsWith('https://')) {
    // Load the state from local storage to avoid having to pass settings as a parameter
    const { settings } = loadState();

    const openPreference = settings
      ? settings.openLinks
      : defaultSettings.openLinks;

    shell.openExternal(url, {
      activate: openPreference === OpenPreference.FOREGROUND,
    });
  }
}

export async function getAppVersion() {
  return await ipcRenderer.invoke('mxtoolkit:version');
}

export function quitApp() {
  ipcRenderer.send('mxtoolkit:quit');
}

export function showWindow() {
  ipcRenderer.send('mxtoolkit:window-show');
}

export function hideWindow() {
  ipcRenderer.send('mxtoolkit:window-hide');
}

export function setAutoLaunch(value) {
  ipcRenderer.send('mxtoolkit:update-auto-launch', {
    openAtLogin: value,
    openAsHidden: value,
  });
}

export function setAlternateIdleIcon(value) {
  ipcRenderer.send('mxtoolkit:use-alternate-idle-icon', value);
}

export function setKeyboardShortcut(keyboardShortcut) {
  ipcRenderer.send('mxtoolkit:update-keyboard-shortcut', {
    enabled: keyboardShortcut,
    keyboardShortcut: CONSTANTS.DEFAULT_KEYBOARD_SHORTCUT,
  });
}

export function updateTrayIcon(isProcessingUploads = true) {
  if (isProcessingUploads) {
    ipcRenderer.send('mxtoolkit:icon-active');
  } else {
    ipcRenderer.send('mxtoolkit:icon-idle');
  }
}

export function updateTrayTitle(title = '') {
  ipcRenderer.send('mxtoolkit:update-title', title);
}
