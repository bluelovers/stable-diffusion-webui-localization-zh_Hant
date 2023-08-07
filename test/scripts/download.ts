import { outputJSON } from 'fs-extra';
import { join } from 'path';
import { __ROOT } from '../__root';

export default Promise.allSettled([
	fetch('https://github.com/hanamizuki-ai/stable-diffusion-webui-localization-zh_Hans/raw/master/localizations/zh-Hans%20(Stable).json')
		.then(res => res.json())
		.then(async (json) => {
			await outputJSON(join(__ROOT, 'localizations', 'zh-Hans.json'), json, {
				spaces: 2,
			});
			return {
				name: 'zh-Hans.json',
				json,
			}
		}),
	fetch('https://github.com/benlisquare/stable-diffusion-webui-localization-zh_TW/raw/main/localizations/zh_TW.json')
		.then(res => res.json())
		.then(async (json) => {
			await outputJSON(join(__ROOT, 'localizations', 'zh_TW.json'), json, {
				spaces: 2,
			});
			return {
				name: 'zh_TW.json',
				json,
			}
		}),
])
	.then(ls => console.dir(ls))
;
