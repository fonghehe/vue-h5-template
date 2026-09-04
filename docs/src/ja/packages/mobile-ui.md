# 共有モバイル UI

`@vh5/mobile-ui` はソース直接参照で UI フレームワーク非依存です。業務画面、`FloatingAiButton`、`LanguageSelect`、安全な Markdown と SVG を公開。アプリが framework/session/endpoint props を渡します。UI ライブラリはこのパッケージに import しません。

```ts
import HomePage from '@vh5/mobile-ui/HomePage.vue';
import FloatingAiButton from '@vh5/mobile-ui/FloatingAiButton.vue';
import { useCartStore } from '@vh5/mobile-ui/cart';
import { useProductPage, useInfiniteProducts } from '@vh5/mobile-ui/queries';
```

`src/surface.css` · `src/cart.ts` · `src/queries.ts` · `src/assets/icons`

```bash
pnpm -F @vh5/mobile-ui type-check
```

[参照: UI](../guide/v2/ui-framework.md) · [参照: Query / Pinia](../guide/essentials/state.md) · [参照: i18n](../guide/essentials/locale.md)

## カートと決済デモ

共通の `/list → /cart → /payment` フローは `commerce.css` と各アプリのテーマ変数を使います。Vant は青、NutUI は赤、Varlet は紫です。一覧には数量付きバッグボタンと丸みのある追加ボタン、カートには選択・削除・44px の数量操作を用意しています。セーフエリア対応の下部バーから遅延読み込みの決済画面を開きます。

WeChat Pay、Alipay、銀行カードから選択して確定します。フロントエンドのみのデモで、決済 SDK・バックエンド注文・実際の請求はありません。選択商品の合計をレシートに表示し、成功時に**未選択商品も含む永続化カート全体を消去**します。レシートは現在の画面内のみで、再読み込みでは復元されません。空または未選択のカートでは決済できません。Mock と実サービスのデータモードで同じ動作をし、実決済には別途バックエンド連携が必要です。

英語・中国語・日本語とアクセシビリティラベルに対応。コンポーネントテストは数量境界・選択・削除・全決済方法・永続化消去を、Playwright は3アプリのフロー・320px レイアウト・日本語表示を検証します。

## ナビゲーションの集約

4つの下部タブを主ナビゲーションにします。Home は概要表示のみで、機能リンクや言語選択を重複させません。Member 自体をマイページとし、渡されたアバター・名前、ログイン状態、アカウント情報と設定を表示します。状態に応じてログイン・ログアウトを提供し、未実装のプロフィール編集項目や新しい API は追加しません。言語変更はここだけで行います。

カートの入口は商品一覧に集約し、詳細画面からは一覧へ戻ります。AI Chat は共通フローティングボタンのみとし、Home と Examples の重複リンクを削除します。Query、Request、Mobile Web API、SVG、PWA、ネイティブコンポーネントは Examples にまとめます。決済フローの戻る・買い物を続ける操作は維持します。3アプリは同じ構成で、それぞれのテーマ色を使います。

## 下部の余白

共有ページの下部余白は 20px です。通常フローのタブが下部セーフエリアを処理するため、タブ付きページは二重に確保しません。タブのないページは自身のセーフエリアを確保します。Cart と Payment は決済操作がある場合だけ `CommerceDock` を表示します。ResizeObserver が固定バーの実寸（セーフエリアやテキストの折り返しを含む）を測り、同じ高さのスペーサーで重なりを防ぎます。追加の余白は 20px のみです。空のカートと決済完了時はバーとスペーサーを一緒に削除し、商品一覧に決済バー分の余白は設けません。
