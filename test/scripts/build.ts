import { outputJSON, readJSON } from 'fs-extra';
import { join } from 'path';
import { __ROOT } from '../__root';
import { initIdeaSegmentText, processTextSync } from '../../src/lib/segment';

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

		return ls.reduce((a, b) => Object.assign(a, b), {})
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

		for (const key of Object.keys(json))
		{
			json[key] = processTextSync(json[key]);
		}

		console.log(`build zh_Hant.json`);

		await outputJSON(join(__ROOT, 'output', 'localizations', 'zh_Hant.json'), json, {
			spaces: 2,
		});

		console.log(`build done.`)
	})
;
