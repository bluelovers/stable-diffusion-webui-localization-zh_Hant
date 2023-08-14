import { __ROOT, __ROOT_OUTPUT } from '../../__root';
import Bluebird from 'bluebird';
import { copy } from 'fs-extra';
import { join } from 'path';

export default Bluebird.each([
	'.github/workflows/build.yml',
	'README.md',
], (file) => {
	return copy(join(__ROOT, file), join(__ROOT_OUTPUT, file), {
		preserveTimestamps: true,
		dereference: true,
	})
});
