import { outputJSON } from 'fs-extra';
import { join } from 'path';
import { __ROOT } from '../__root';
import { crossSpawnGitSync } from '@git-lazy/spawn';

export default Promise.allSettled([
	fetch('https://github.com/hanamizuki-ai/stable-diffusion-webui-localization-zh_Hans/raw/master/localizations/zh-Hans%20(Stable).json')
		.then(res => res.json())
		.then(async (json) => {
			const file = join(__ROOT, 'localizations', 'zh-Hans.json');
			await outputJSON(file, json, {
				spaces: 2,
			});
			return {
				name: 'zh-Hans.json',
				json,
				file,
			}
		}),
	fetch('https://github.com/benlisquare/stable-diffusion-webui-localization-zh_TW/raw/main/localizations/zh_TW.json')
		.then(res => res.json())
		.then(async (json) => {
			const file = join(__ROOT, 'localizations', 'zh_TW.json');
			await outputJSON(file, json, {
				spaces: 2,
			});
			return {
				name: 'zh_TW.json',
				json,
				file,
			}
		}),
])
	.then(async (ls) => {
		console.dir(ls)

		// @ts-ignore
		let files = ls.map(result => result.value?.file).filter(v => v?.length);

		files.length && crossSpawnGitSync('git', [
			'commit',
			'-m',
			`build: update download`,
			'--',
			...files,
		], {
			cwd: join(__ROOT, 'localizations'),
			stdio: 'inherit',
		});
	})
;
