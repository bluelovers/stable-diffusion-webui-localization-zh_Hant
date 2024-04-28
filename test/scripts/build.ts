import { outputJSON, readFile, readJSON } from 'fs-extra';
import { join } from 'path';
import { __ROOT, __ROOT_OUTPUT } from '../__root';
import { initIdeaSegmentText, processTextSync } from '../../src/lib/segment';
import { tw2cn_min } from '@lazy-cjk/zh-convert/min';
import { parse } from 'json5'
import Bluebird from 'bluebird';
import { sortObjectKeys } from 'sort-object-keys2';
import { compareCaseInsensitive } from '@bluelovers/string-natural-compare';

function readJSON5(path: string)
{
	return readFile(path).then(buf => parse(buf.toString()))
}

function omitEngligh<T extends Record<string, string>>(tw: T)
{
	Object.entries(tw)
		.forEach(([key, value]) =>
		{
			if (key === value)
			{
				delete tw[key]
			}
		})
	;
	return tw
}

export default Bluebird.props({
		tw: readJSON(join(__ROOT, 'localizations', 'zh_TW.json')),
		cn: readJSON(join(__ROOT, 'localizations', 'zh-Hans.json')),
	})
	.then(async (props) => {

		let ls = await Promise.all([
			{
				...props.cn,
			},
			readJSON(join(__ROOT, 'localizations', 'zh_TW.json')),
			/**
			 * @see https://github.com/xhoxye/stable-diffusion-webui-forge/blob/main/localizations
			 * @see https://nga.178.com/read.php?tid=39308107&rand=884
			 */
			readJSON(join(__ROOT, 'localizations', 'sd-webui-zh_CN-xhox20240214(testing).json'))
				.then(omitEngligh)
				.then(data => {

					Object.keys(data).forEach(key => {
						if (key.length === 1 || key.includes('_') && /^[_a-z]{2,}$/.test(key) && key === key.toLowerCase())
						{
							delete data[key]
						}
					})

					return data
				})
			,
			omitEngligh(props.cn),
			omitEngligh(props.tw),
			readJSON5(join(__ROOT, 'localizations', 'my.json5')),
		]);

		return ls
	})
	.then(ls =>
	{
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

		const ignoreProcessList = [
			'zh_Hant',
			'zh_Hans',
		];

		const json_hans: typeof json = {};

		json = sortObjectKeys(json, compareCaseInsensitive);

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
				if (ignoreProcessList.includes(key))
				{
					json_hans[key] = json[key] = value;
				}
				else
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
