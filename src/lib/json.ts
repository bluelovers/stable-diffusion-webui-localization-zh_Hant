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

export function omit_xhox20240214<T extends ILocalizationsJsonData>(data: T)
{
	for (const key in data)
	{
		if (key.length === 1 || key.includes('_') && /^[_a-z]{2,}$/.test(key) && key === key.toLowerCase())
		{
			delete data[key]
		}
	}

	return data;
}

export function merge2<T extends ILocalizationsJsonData>(data: T, data2: T, remerge?: boolean)
{
	data = {
		...data,
		...data2,
	}

	if (remerge)
	{
		data = {
			...data2,
			...data,
		}
	}

	return data;
}
