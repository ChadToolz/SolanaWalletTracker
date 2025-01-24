import fs from 'node:fs';
import os from 'node:os';
import path from 'node:path';
import { dialog, shell } from 'electron';
import log from 'electron-log';

export function takeScreenshot(mb) {
  const date = new Date();
  const dateStr = date.toISOString().replace(/:/g, '-');

  const capturedPicFilePath = `${os.homedir()}/${dateStr}-chadtoolz-screenshot.png`;
  mb.window.capturePage().then((img) => {
    fs.writeFile(capturedPicFilePath, img.toPNG(), () =>
      log.info(`Screenshot saved ${capturedPicFilePath}`),
    );
  });
}

export function resetApp(mb) {
  const cancelButtonId = 0;
  const resetButtonId = 1;

  const response = dialog.showMessageBoxSync(mb.window, {
    type: 'warning',
    title: 'Reset',
    message:
      'Are you sure?',
    buttons: ['Cancel', 'Reset'],
    defaultId: cancelButtonId,
    cancelId: cancelButtonId,
  });

  if (response === resetButtonId) {
    mb.window.webContents.send('chadtoolz:reset-app');
    mb.app.quit();
  }
}

export function openLogsDirectory() {
  const logDirectory = path.dirname(log.transports.file?.getFile()?.path);

  if (!logDirectory) {
    log.error('Could not find log directory!');
    return;
  }

  shell.openPath(logDirectory);
}
