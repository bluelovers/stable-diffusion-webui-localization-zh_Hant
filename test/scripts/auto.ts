import('./download')
	.then((m) => m.default)
	.then(() => import('./build'))
	.then((m) => m.default)
;
