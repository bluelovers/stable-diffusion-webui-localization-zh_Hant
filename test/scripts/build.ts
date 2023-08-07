import { outputJSON, readJSON } from 'fs-extra';
import { join } from 'path';
import { __ROOT } from '../__root';

export default Promise.all([
		readJSON(join(__ROOT, 'localizations', 'zh_TW.json')),
		readJSON(join(__ROOT, 'localizations', 'zh-Hans.json')),
		readJSON(join(__ROOT, 'localizations', 'zh_TW.json')),
		readJSON(join(__ROOT, 'localizations', 'my.json')),
	])
	.then(ls =>
	{

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
		await outputJSON(join(__ROOT, 'localizations', 'zh_Hant.json'), json, {
			spaces: 2,
		});

		await outputJSON(join(__ROOT, 'output', 'localizations', 'zh_Hant.json'), json, {
			spaces: 2,
		});

		console.log(`build done.`)
	})
;
