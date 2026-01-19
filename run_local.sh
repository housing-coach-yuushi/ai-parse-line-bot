#!/bin/bash
# ローカル開発用起動スクリプト

echo "=== AI Parse LINE Bot ローカル起動 ==="

# 仮想環境のアクティベート（存在する場合）
if [ -d "venv" ]; then
    source venv/bin/activate
fi

# 依存関係インストール
echo "Installing dependencies..."
pip install -r requirements.txt -q

# .envファイルチェック
if [ ! -f ".env" ]; then
    echo "⚠️  .env ファイルがありません"
    echo "   .env.example をコピーして設定してください:"
    echo "   cp .env.example .env"
    exit 1
fi

# サーバー起動
echo "Starting server on http://localhost:8000"
echo ""
echo "Webhook URL (ngrok使用時): https://your-ngrok-url.ngrok.io/webhook"
echo ""
uvicorn main:app --reload --host 0.0.0.0 --port 8000
