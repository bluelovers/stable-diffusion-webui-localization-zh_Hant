import { stream } from 'fast-glob';
import { __ROOT_LOCALIZATIONS_MY, __ROOT_LOCALIZATIONS_SRC } from '../../test/__root';
import { ILocalizationsJsonData, readJSON5 } from './fs';
import { join } from 'path';

export function globLocalizationsMySub()
{
	return stream('**/*.json*', {
		cwd: __ROOT_LOCALIZATIONS_MY,
		unique: true,
		onlyFiles: true,
	});
}

export async function readLocalizationsMySubAll(result?: ILocalizationsJsonData): Promise<ILocalizationsJsonData>
{
	const gen = globLocalizationsMySub() as unknown as string[];

	result ??= {};

	for await (const entry of gen)
	{
		console.log('Reading:', entry);

		const json = await readJSON5(join(__ROOT_LOCALIZATIONS_MY, entry)).catch(e =>
		{
			console.error('Failed to read:', entry, e);
			return null;
		});
		if (json)
		{
			Object.assign(result, json);
		}
	}
	return result;
}

export function readLocalizationsMyMain()
{
	console.log('Reading main localization file:', 'my.json5');
	return readJSON5(join(__ROOT_LOCALIZATIONS_SRC, 'my.json5'));
}

export async function readLocalizationsMyAll(result?: ILocalizationsJsonData): Promise<ILocalizationsJsonData>
{
	result ??= {};

	const my = await readLocalizationsMyMain();
	const mySub = await readLocalizationsMySubAll();

	return {
		...result,
		...my,
		...mySub,
	};
}
