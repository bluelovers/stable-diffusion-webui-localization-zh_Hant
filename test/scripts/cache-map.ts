import { join } from 'path';
import { __ROOT_CACHE, __ROOT_OUTPUT } from '../__root';
import { outputJSON, readJSON } from 'fs-extra';

export default readJSON(join(__ROOT_OUTPUT, 'localizations/zh_Hant.json'))
	.then((json: Record<string, string>) => {
		const map: Record<string, Record<string, string>> = {};

		for (const key in json)
		{
			const lc = key.toLowerCase();

			map[lc] ??= {};
			map[lc][key] = json[key];
		}

		for (const lc in map)
		{
			if (Object.keys(map[lc]).length <= 1) {
				delete map[lc];
			}
		}

		return outputJSON(join(__ROOT_CACHE, 'cache.json'), map, {
			spaces: 2,
		})
	})
;
