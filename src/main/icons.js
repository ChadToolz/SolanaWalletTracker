import path from 'node:path';

export const TrayIcons = {
  active: getIconPath('tray-active.png'),
  activeUpdateIcon: getIconPath('tray-active-update.png'),
  idle: getIconPath('tray-idleTemplate.png'),
  idleUpdateIcon: getIconPath('tray-idle-update.png'),
  idleAlternate: getIconPath('tray-idle-white.png'),
  idleAlternateUpdateIcon: getIconPath('tray-idle-white-update.png'),
};

function getIconPath(iconName) {
  console.log(path.join(import.meta.dirname, '..', 'assets', 'images', iconName));
  return path.join(import.meta.dirname, '..', '..', 'assets', 'images', iconName);
}
