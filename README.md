# stable-diffusion-webui-localization-zh_Hant

[![build](https://github.com/bluelovers/stable-diffusion-webui-localization-zh_Hant/actions/workflows/build.yml/badge.svg?branch=dev)](https://github.com/bluelovers/stable-diffusion-webui-localization-zh_Hant/actions/workflows/build.yml)

繁體中文語言包（合併 zh_TW 與 zh_Hans 語言包已翻譯的內容來讓介面有更多中文說明）

Traditional Chinese translation extension for Stable Diffusion web UI by AUTOMATIC1111

> 推薦搭配 [Bilingual Localization（雙語翻譯對照）](https://github.com/journey-ad/sd-webui-bilingual-localization)

## 合併翻譯來源

- https://github.com/hanamizuki-ai/stable-diffusion-webui-localization-zh_Hans
- https://github.com/benlisquare/stable-diffusion-webui-localization-zh_TW

## 說明

> 請查看 [dev](https://github.com/bluelovers/stable-diffusion-webui-localization-zh_Hant/tree/dev) 分支

- 基於簡體語言包與繁體語言包的混和
- 以分詞系統來轉繁與修正用語 (請參考 https://github.com/bluelovers/idea-l10n-zht#readme)
- 定期自動更新翻譯

## 關於修改翻譯

請編輯以下檔案

1. [localizations/my.json5](https://github.com/bluelovers/stable-diffusion-webui-localization-zh_Hant/blob/dev/localizations/my.json5) - 會直接取代相同項目
2. [src/dict/synonym.txt](https://github.com/bluelovers/stable-diffusion-webui-localization-zh_Hant/blob/dev/src/dict/synonym.txt) - 基於分詞系統取代
3. [src/dict/table.txt](https://github.com/bluelovers/stable-diffusion-webui-localization-zh_Hant/blob/dev/src/dict/table.txt) - 基於分詞系統取代
4. [test/segment.spec.ts](https://github.com/bluelovers/stable-diffusion-webui-localization-zh_Hant/blob/dev/test/segment.spec.ts) - 簡易檢查結果是否符合期待


