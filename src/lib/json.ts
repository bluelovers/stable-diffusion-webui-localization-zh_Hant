import { ILocalizationsJsonData, ILocalizationsJsonDataValue } from './fs';

export function _isKeyEqualValue(key: string, value?: ILocalizationsJsonDataValue)
{
	return key.trim() === value?.trim();
}

export function _deleteKeyEqualValue<T extends ILocalizationsJsonData>(data: T, key: string, value: ILocalizationsJsonDataValue)
{
	if (_isKeyEqualValue(key, value))
	{
		delete data[key];
	}

	return data;
}

export function omitEngligh<T extends ILocalizationsJsonData>(tw: T)
{
	for (const key in tw)
	{
		_deleteKeyEqualValue(tw, key, tw[key]);
	}

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
		else if (/[（(]不[）)]\s*$/.test(data[key]))
		{
			/**
			 * @example
			 * LMS（不）
			 */
			data[key] = data[key].replace(/\s*[（(]不[）)]\s*$/, '') as any;

			_deleteKeyEqualValue(data, key, data[key]);
		}
	}

	return data;
}

export function merge2<T extends ILocalizationsJsonData>(data: T, data2: T, remerge?: boolean)
{
	let result = {
		...data,
		...data2,
	}

	if (remerge)
	{
		result = {
			...result,
			...data,
		}
	}

	return result;
}
