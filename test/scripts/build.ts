import { outputJSON, readFile, readJSON } from 'fs-extra';
import { join } from 'path';
import { __ROOT, __ROOT_OUTPUT } from '../__root';
import { initIdeaSegmentText, processTextSync } from '../../src/lib/segment';
import { tw2cn_min } from '@lazy-cjk/zh-convert/min';
import { parse } from 'json5'

function readJSON5(path: string)
{
	return readFile(path).then(buf => parse(buf.toString()))
}

export default Promise.all([
		readJSON(join(__ROOT, 'localizations', 'zh_TW.json')),
		readJSON(join(__ROOT, 'localizations', 'zh-Hans.json')),
		readJSON(join(__ROOT, 'localizations', 'zh_TW.json')),
		readJSON5(join(__ROOT, 'localizations', 'my.json5')),
	])
	.then(ls =>
	{
		console.log(`merge localizations`);

		let tw = ls[2];

		Object.entries(tw)
			.forEach(([key, value]) =>
			{
				if (key === value)
				{
					delete tw[key]
				}
			})
		;

		ls.unshift(ls[1]);

		return ls.reduce((a, b) => Object.assign(a, b), {}) as Record<string, string>
	})
	.then(async (json) =>
	{
		console.log(`output zh_Hant.json`);

		await outputJSON(join(__ROOT, 'localizations', 'zh_Hant.json'), json, {
			spaces: 2,
		});

		console.log(`init Segment`);

		await initIdeaSegmentText();

		console.log(`process zh_Hant.json`);

		const json_hans: typeof json = {};

		for (const key of Object.keys(json))
		{
			let value = json[key];
			let _do = true;

			if (typeof value === 'undefined' || value === null || key === value || typeof value !== 'string' && typeof value !== 'number')
			{
				_do = false;
			}

			if (_do)
			{
				value = processTextSync(value);

				if (key === value)
				{
					_do = false;
				}
				else
				{
					json[key] = value;
					json_hans[key] = tw2cn_min(value);
				}
			}

			if (!_do)
			{
				delete json[key]
			}
		}

		console.log(`build zh_Hant.json`);

		await Promise.all([
			outputJSON(join(__ROOT_OUTPUT, 'localizations', 'zh_Hant.json'), json, {
				spaces: 2,
			}),
			outputJSON(join(__ROOT_OUTPUT, 'localizations', 'zh_Hans.json'), json_hans, {
				spaces: 2,
			}),
		])

		console.log(`build done.`)
	})
;
