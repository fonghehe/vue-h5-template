# 国際化

画面の既定は英語 `en-US`。Member で English、简体中文 `zh-CN`、日本語 `ja-JP` を選択できます。`vh5:locale` の保存済み設定を優先し、`<html lang>` も更新します。ドキュメントの 5 言語とアプリの 3 言語は別の設定です。

共有文言は `packages/locales/src/langs/{en-US,zh-CN,ja-JP}/{app,mobile,demo}.json`。アクセシビリティ、エラー、ルートタイトルも同じキー構成で翻訳します。既存の `zh-TW` はカスタム利用向けで、新しい mobile/demo の全キーはなく、標準セレクターには含みません。

各 `src/locales/index.ts` がアプリと UI ライブラリの言語を読み込みます。NutUI 日本語は `nutui-ja.ts`、Varlet は登録後に選択、Vant はネイティブ言語パックです。共有コンポーネントは `useI18n()`、アプリは `@/locales` の `t` を使います。

`await loadLocaleMessages('ja-JP')` で必要な言語を読み込んでから切り替えます。共有フォールバックは英語です。言語追加では型、辞書、保存許可リスト、LanguageSelect、ネイティブアダプター、テストを更新します。

REST/AI は `Accept-Language` を送信します。Nitro は商品 fixture を翻訳しますが、実際のバックエンドと AI 出力の翻訳はサーバー側の責任です。Query キーにも言語を含めます。共有画面が依存するため、辞書だけを削除しないでください。
