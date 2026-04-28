# プロジェクト更新

## 最新コードの同期

```bash
# 最新の変更を取得
git fetch origin
git pull origin main

# 依存関係を再インストール（lockfile の変更がある場合）
pnpm install
```

## 依存関係の更新

```bash
# 古い依存関係を確認
pnpm outdated -r

# すべての依存関係をインタラクティブに最新版へ更新
pnpm update -r --interactive --latest
```

## キャッシュのクリア

更新後にビルドの問題が発生した場合、キャッシュをクリアしてみてください：

```bash
# すべてのキャッシュ、node_modules、dist をクリア
pnpm clean

# 完全再インストール
pnpm reinstall
```

## 破壊的変更への対応

依存関係のメジャーバージョンを更新する際：

1. UI フレームワークの移行ガイドを確認（NutUI / Vant / Varlet）
2. Vite のリリースノートで破壊的変更を確認
3. 更新後、3つのアプリバリアントすべてをテスト
4. プラグイン API が変更された場合、共有 Vite 設定を更新
