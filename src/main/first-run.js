import fs from 'node:fs';
import path from 'node:path';
import { app, dialog } from 'electron';
import log from 'electron-log';

export async function onFirstRunMaybe() {
  if (isFirstRun()) {
    await promptMoveToApplicationsFolder();
  }
}

// Ask user if the app should be moved to the applications folder.
async function promptMoveToApplicationsFolder() {
  if (process.platform !== 'darwin') return;

  const isDevMode = !!process.defaultApp;
  if (isDevMode || app.isInApplicationsFolder()) return;

  const { response } = await dialog.showMessageBox({
    type: 'question',
    message: 'Move to Applications Folder?',
    buttons: ['Move to Applications Folder', 'Do Not Move'],
    defaultId: 0,
  });

  if (response === 0) {
    app.moveToApplicationsFolder();
  }
}

const getConfigPath = () => {
  const userDataPath = app.getPath('userData');
  return path.join(userDataPath, 'FirstRun', 'chadtoolz-first-run');
};

// Whether or not the app is being run for the first time.
function isFirstRun() {
  const configPath = getConfigPath();

  try {
    if (fs.existsSync(configPath)) {
      return false;
    }

    const firstRunFolder = path.dirname(configPath);
    if (!fs.existsSync(firstRunFolder)) {
      fs.mkdirSync(firstRunFolder);
    }

    fs.writeFileSync(configPath, '');
  } catch (error) {
    log.error('First run: Unable to write firstRun file', error);
  }

  return true;
}
