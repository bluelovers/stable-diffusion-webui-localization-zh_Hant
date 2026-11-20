import { join } from "path";

export const __ROOT = join(__dirname, '..');

export const isWin = process.platform === "win32";

export const __ROOT_OUTPUT = join(__ROOT, 'output');

export const __ROOT_CACHE = join(__ROOT, 'test', 'cache');

export const __ROOT_LOCALIZATIONS_SRC = join(__ROOT, 'localizations');

export const __ROOT_LOCALIZATIONS_MY = join(__ROOT_LOCALIZATIONS_SRC, 'my');

export const __ROOT_LOCALIZATIONS_SRC_OUT = join(__ROOT_LOCALIZATIONS_SRC, 'out');

export const __ROOT_LOCALIZATIONS_DST = join(__ROOT_OUTPUT, 'localizations');
