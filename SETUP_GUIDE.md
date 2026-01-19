# AI住宅パース LINE Bot セットアップガイド

## 1. LINE Developers設定

### 1.1 チャネル作成
1. [LINE Developers Console](https://developers.line.biz/) にログイン
2. 「プロバイダー」を作成（初回のみ）
3. 「新規チャネル作成」→「Messaging API」を選択
4. 必要事項を入力：
   - チャネル名: AI住宅パース
   - チャネル説明: 建築パースをAIでフォトリアル化
   - 大業種: 不動産
   - 小業種: 不動産（建設・建築）

### 1.2 チャネル設定
1. 作成したチャネルを開く
2. 「Messaging API設定」タブ：
   - **チャネルアクセストークン**を発行（長期）→ コピー
3. 「チャネル基本設定」タブ：
   - **チャネルシークレット** → コピー

### 1.3 Webhook設定
1. 「Messaging API設定」タブ
2. Webhook URL: `https://your-app.onrender.com/webhook`
3. Webhookの利用: ON
4. 応答メッセージ: OFF
5. あいさつメッセージ: OFF

---

## 2. Renderデプロイ

### 2.1 GitHubリポジトリ準備
```bash
cd line_bot
git init
git add .
git commit -m "Initial commit"
git remote add origin https://github.com/your-username/ai-parse-line-bot.git
git push -u origin main
```

### 2.2 Renderでデプロイ
1. [Render](https://render.com/) にログイン
2. 「New」→「Web Service」
3. GitHubリポジトリを接続
4. 設定：
   - Name: ai-parse-line-bot
   - Environment: Python
   - Build Command: `pip install -r requirements.txt`
   - Start Command: `uvicorn main:app --host 0.0.0.0 --port $PORT`

### 2.3 環境変数設定
Renderダッシュボードで設定：
- `LINE_CHANNEL_SECRET`: LINEのチャネルシークレット
- `LINE_CHANNEL_ACCESS_TOKEN`: LINEのアクセストークン
- `KIEAI_API_KEY`: KIE.AIのAPIキー
- `FREE_MONTHLY_LIMIT`: 3（無料枠）

---

## 3. 動作確認

1. LINEアプリで友だち追加（QRコード）
2. 建築パースの画像を送信
3. スタイル選択
4. 30秒程度で結果が返信

---

## 4. ファイル構成

```
line_bot/
├── main.py              # メインアプリ
├── config.py            # 設定
├── requirements.txt     # 依存関係
├── Procfile            # Render用
├── render.yaml         # Render設定
├── .env.example        # 環境変数サンプル
└── services/
    ├── __init__.py
    ├── kie_api.py      # KIE.AI連携
    └── user_db.py      # ユーザー管理
```

---

## 5. トラブルシューティング

### Webhookエラー
- Render URLが正しいか確認
- LINE DevelopersでWebhookの検証をクリック

### 画像生成失敗
- KIE.AI APIキーが有効か確認
- クレジット残高を確認

### 署名エラー
- LINE_CHANNEL_SECRETが正しいか確認
