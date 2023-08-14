import { _lazyImport } from '../../src/lib/util';

export default import('./download')
	.then(_lazyImport)
	.then(() => import('./build'))
	.then(_lazyImport)
	.then(() => import('./output/copy'))
	.then(_lazyImport)
;
