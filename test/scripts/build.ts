import { outputJSON, readFile } from 'fs-extra';
import { join } from 'path';
import { __ROOT, __ROOT_LOCALIZATIONS_DST, __ROOT_LOCALIZATIONS_SRC, __ROOT_LOCALIZATIONS_SRC_OUT, __ROOT_OUTPUT } from '../__root';
import { initIdeaSegmentText, processTextSync } from '../../src/lib/segment';
import { tw2cn_min } from '@lazy-cjk/zh-convert/min';
import { parse } from 'json5'
import Bluebird from 'bluebird';
import { sortObjectKeys } from 'sort-object-keys2';
import { compareCaseInsensitive } from '@bluelovers/string-natural-compare';
import { ILocalizationsJsonData, readJSON5 } from '../../src/lib/fs';
import { readLocalizationsMyAll } from '../../src/lib/glob-localizations';
import { omitEngligh } from '../../src/lib/json';

export default Bluebird.props({
		tw: readJSON5(join(__ROOT_LOCALIZATIONS_SRC, 'zh_TW.json'))
			.then(async (data) => {
				let data2 = await readJSON5(join(__ROOT_LOCALIZATIONS_SRC, 'zh_Hant_DianNaoTou.json'));

				return {
					...data,
					...data2,
				}
			}),
		cn: readJSON5(join(__ROOT_LOCALIZATIONS_SRC, 'zh-Hans.json'))
			.then(async (data) => {
				let data2 = await readJSON5(join(__ROOT_LOCALIZATIONS_SRC, 'zh-Hans_hben35096.json'));

				return {
					...data,
					...data2,
					...data,
				}
			}),
	})
	.then(async (props) => {

		let ls = await Promise.all([
			{
				...props.cn,
			},
			readJSON5(join(__ROOT_LOCALIZATIONS_SRC, 'zh_TW.json')),
			omitEngligh(props.cn),
			/**
			 * @see https://github.com/xhoxye/stable-diffusion-webui-forge/blob/main/localizations
			 * @see https://nga.178.com/read.php?tid=39308107&rand=884
			 */

			readJSON5(join(__ROOT_LOCALIZATIONS_SRC, 'sd-webui-zh_CN-xhox20240214(testing).json'))
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

			omitEngligh(props.tw),
			readLocalizationsMyAll(),
		]);

		return ls
	})
	.then(ls =>
	{
		return ls.reduce((a, b) => Object.assign(a, b), {}) as ILocalizationsJsonData
	})
	.then(async (json) =>
	{
		console.log(`output zh_Hant.json`);

		await outputJSON(join(__ROOT_LOCALIZATIONS_SRC_OUT, 'zh_Hant.json'), json, {
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
			outputJSON(join(__ROOT_LOCALIZATIONS_DST, 'zh_Hant.json'), json, {
				spaces: 2,
			}),
			outputJSON(join(__ROOT_LOCALIZATIONS_DST, 'zh_Hans.json'), json_hans, {
				spaces: 2,
			}),
		])

		console.log(`build done.`)
	})
;
