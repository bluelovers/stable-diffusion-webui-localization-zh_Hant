import { join } from "path";

export const __ROOT = join(__dirname, '..');

export const isWin = process.platform === "win32";

export const __ROOT_OUTPUT = join(__ROOT, 'output');
