import { loadFile as loadFileSynonym } from "@novel-segment/sort-synonym";
import { stringifyHandleDictLinesList } from "@novel-segment/util-compare";
import { outputFile, writeFile } from 'fs-extra';
import { LF } from 'crlf-normalize';
import { loadFile as loadFileTable } from '@novel-segment/sort-dict-table';
import { basename } from 'path';
import { __dict_synonym_txt, __dict_table_txt } from '../../src/lib/segment';

export default Promise.all([
	loadFileTable(__dict_table_txt)
		.then(list =>
		{
			const lines = stringifyHandleDictLinesList(list);

			return writeFile(__dict_table_txt, lines.join(LF) + LF)
				.then(() => console.log(`sort ${basename(__dict_table_txt)}`))
		}),
	loadFileSynonym(__dict_synonym_txt)
		.then(list =>
		{
			const lines = stringifyHandleDictLinesList(list);

			return writeFile(__dict_synonym_txt, lines.join(LF) + LF)
				.then(() => console.log(`sort ${basename(__dict_synonym_txt)}`))
		}),
])
