//@noUnusedParameters:false
/// <reference types="jest" />
/// <reference types="node" />
/// <reference types="expect" />

import { lazyMatchSynonym001, lazyMatchSynonym001Not } from '@novel-segment/assert';
import { initIdeaSegmentText, processTextSync } from '../src/lib/segment';
import { ITSValueOrArrayMaybeReadonly } from 'ts-type/lib/type/base';
import { _comp } from './lib/_sort_comp';
import { assertTestExpected } from './lib/assertTestExpected';

jest.setTimeout(60 * 1000);

beforeAll(async () =>
{
	await initIdeaSegmentText()
});

type ITestList = [ITSValueOrArrayMaybeReadonly<string>, string][];

/**
 * 檢查是否確實轉換
 * 通過測試不代表轉換符合預期，因為檢查詞必須要正確設定才可以
 *
 * 轉換結果必須『不包含』指定內容
 */
describe(`should not include`, () =>
{

	test.skip(`dummy`, () => {});

	(<ITestList>[

		["文本", "CLIP：文本文件中的最大行數（0 為無限制）"],
		["文檔", "此項目中的所有顯著更改都將被記錄在本文檔中"],
		["演演", "選擇一種演算法/方法來保持整個動畫的顏色一致性"],
		["浮浮", "不在圖像上新增浮水印"],

	]).sort((a, b) =>
	{
		return _comp(a[0], b[0])
	}).forEach(text =>
	{

		test(_handleTitles(text), async () =>
		{
			const expected = [text[0]].flat();

			assertTestExpected(expected);

			let actual = await processTextSync(text[1]);

			lazyMatchSynonym001Not(actual, expected);
			//expect(actual).not.toContain(text[0])
			expect(actual).toMatchSnapshot();

		});

	});

})

/**
 * 檢查是否發生誤轉換
 * 轉換結果必須『包含』指定內容
 */
describe(`should include`, () =>
{

	(<ITestList>[

		["執行緒數", "用於雜湊值計算的線程數（如果使用 SSD 可適量增加）"],
		["文字", "(需啟用 \"新增 Lora 的雜湊值文本到圖像資訊中\" 選項)"],
		["字元", "選項只有當搜尋字串有4個或更多字符時"],
		["遺失", "用於抵消採樣過程中丟失細節的額外噪點量"],
		["疊代", "則其表示一個確定的迭代步數數值"],
		["透過", "在使用通過零終信噪比"],
		["即時", "最佳化下使用完整實時預覽模式會導致生成速度異常緩慢"],
		["規範化", "但沒有規范化"],
		["副檔名", "需要帶檔案拓展名"],
		["目前", "當前僅作用於"],
		["字元", "適用於本機有大型萬用字元集合時"],
		["字元", "並按下複製選集來創建您的萬用字源庫"],
		["重新整理", "預防刷新程序被掛起"],
		["本機", "中設定的本地啟用關鍵詞"],
		["文字", "它們將被新增在文本檔案的開始/末尾。"],
		["轉高畫質", "像素 轉高清"],
		["拖曳", "拖拽任意圖像到圖生圖主視窗"],
		["欄位", "在相應的字段中新增提示詞前綴"],
		["使用者名稱", "將已認證的用戶名新增到生成資訊"],
		["係數", "提示詞引導系數"],
		["復原", "撤銷操作也會停用此功能"],
		["稜角", "angular (棱角)"],
		["壓製", "在以下選項啟用時將不會轉碼壓制進幀插值後的影片內"],
		["批次", "批量檢查點和關鍵字"],
		["批次", "批處理模式"],
		["包浩斯", "包豪斯"],
		["下拉選單", "大模型下拉列表"],
		["記憶體", "暫存在內存（RAM）中的模型權重存檔點數"],
		["控制項", "以啟用控件"],
		["灰階", "強制顏色空間為灰度"],
		["相容性", "與其他擴展的兼容性"],
		["影片", "前一幀初始圖像的合成視頻在"],
		["分隔符號", "控制的空白分隔符"],
		["命令列", "命令行參數"],
		["命令列", "停用 Aria2 的異步 DNS"],
		["採樣", "采樣前將模型"],
		["反鋸齒", "放大時使用抗鋸齒"],
		["向量化", "啟用矢量化"],
		["攝影機", "開啟網絡攝像頭"],
		["剪貼簿", "複製到剪切板"],
		["", ""],


	]).sort((a, b) =>
	{
		return _comp(a[0], b[0])
	}).forEach(text =>
	{

		test(_handleTitles(text), async () =>
		{
			const expected = [text[0]].flat();

			assertTestExpected(expected);

			let actual = await processTextSync(text[1]);

			lazyMatchSynonym001(actual, expected);
			//expect(actual).not.toContain(text[0])
			expect(actual).toMatchSnapshot();

		});

	});

})

function _handleTitles(actual: [ITSValueOrArrayMaybeReadonly<string>, string])
{
	let arr = actual.slice();
	arr[0] = [arr[0]].flat().join('／');
	return arr.join(' - ')
}
