
import { parse } from 'json5'
import { readFile } from 'fs-extra';
import { relative } from 'upath2';
import { __ROOT } from '../../test/__root';

export type ILocalizationsJsonData = Record<string, string | null>;

export async function readJSON5(path: string)
{
	const buf = await readFile(path);

	if (!buf?.length)
	{
		console.warn(`File is empty: ${relative(__ROOT, path)}`);
		return null;
	}

	return parse(buf.toString()) as ILocalizationsJsonData;
}
