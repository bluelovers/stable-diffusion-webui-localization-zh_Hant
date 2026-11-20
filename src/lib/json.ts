import { ILocalizationsJsonData } from './fs';

export function omitEngligh<T extends ILocalizationsJsonData>(tw: T)
{
	Object.entries(tw)
		.forEach(([key, value]) =>
		{
			if (key === value)
			{
				delete tw[key];
			}
		});
	return tw as T;
}
