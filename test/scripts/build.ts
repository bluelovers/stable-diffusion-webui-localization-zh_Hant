import { outputJSON, readJSON } from 'fs-extra';
import { join } from 'path';
import { __ROOT, __ROOT_OUTPUT } from '../__root';
import { initIdeaSegmentText, processTextSync } from '../../src/lib/segment';
import { tw2cn_min } from '@lazy-cjk/zh-convert/min';

export default Promise.all([
		readJSON(join(__ROOT, 'localizations', 'zh_TW.json')),
		readJSON(join(__ROOT, 'localizations', 'zh-Hans.json')),
		readJSON(join(__ROOT, 'localizations', 'zh_TW.json')),
		readJSON(join(__ROOT, 'localizations', 'my.json')),
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
			json[key] = processTextSync(json[key]);

			if (key === json[key])
			{
				delete json[key]
			}
			else
			{
				json_hans[key] = tw2cn_min(json[key]);
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
