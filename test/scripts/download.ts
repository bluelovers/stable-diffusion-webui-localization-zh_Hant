import { outputJSON } from 'fs-extra';
import { join } from 'path';
import { __ROOT } from '../__root';
import { crossSpawnGitSync } from '@git-lazy/spawn';

export default Promise.allSettled([
	fetch('https://github.com/hanamizuki-ai/stable-diffusion-webui-localization-zh_Hans/raw/master/localizations/zh-Hans%20(Stable).json')
		.then(res => res.json())
		.then((json) => _writeReturn(json, 'zh-Hans.json')),
	fetch('https://github.com/hben35096/stable-diffusion-webui-localization-zh_Hans/raw/master/localizations/zh-Hans%20(Stable).json')
		.then(res => res.json())
		.then((json) => _writeReturn(json, 'zh-Hans_hben35096.json')),
	fetch('https://github.com/benlisquare/stable-diffusion-webui-localization-zh_TW/raw/main/localizations/zh_TW.json')
		.then(res => res.json())
		.then((json) => _writeReturn(json, 'zh_TW.json')),
])
	.then(async (ls) => {
		console.dir(ls)

		// @ts-ignore
		let files = ls.map(result => result.value?.file).filter(v => v?.length);

		if (files.length)
		{
			const cwd = join(__ROOT, 'localizations');

			crossSpawnGitSync('git', [
				'add',
				...files,
			], {
				cwd,
				stdio: 'inherit',
			});
			crossSpawnGitSync('git', [
				'commit',
				'-m',
				`build: update download`,
				'--',
				...files,
			], {
				cwd,
				stdio: 'inherit',
			});
		}
	})
;

async function _writeReturn(json: Record<string, string>, name: string)
{
	const file = join(__ROOT, 'localizations', name);
	await outputJSON(file, json, {
		spaces: 2,
	});
	return {
		name,
		json,
		file,
	}
}
