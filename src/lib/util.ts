
export function _lazyImport<T>(m: T | {
	default: T
}): T
{
	// @ts-ignore
	return m.default ?? m
}
