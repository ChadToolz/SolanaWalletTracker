export function isLinux() {
  return process.platform === "linux";
}

export function isMacOS() {
  return process.platform === "darwin";
}

export function isWindows() {
  return process.platform === "win32";
}
