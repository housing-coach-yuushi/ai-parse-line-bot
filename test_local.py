"""
ローカルテスト用スクリプト
LINE Botを使わずにKIE.AI連携をテスト
"""
import asyncio
import sys
from pathlib import Path

# 環境変数読み込み
from dotenv import load_dotenv
load_dotenv()

from services.kie_api import generate_parse

# テスト用プロンプト
TEST_PROMPT = """添付の建築パースをフォトリアルにしてください。
建物の形状・構成・アングル・奥行・カメラ位置・パースラインは絶対に変更しないでください。
素材・質感・光の表現だけを実写に寄せてください。

【必ず守ってほしい内容】
・外観の形状を一切変えない
・窓の位置、壁のライン、屋根形状、陰影の付き方の方向はそのまま
・広角率を変えない
・縦横比を維持
・背景の構成を変えない

【フォトリアル化条件】
・外壁はモダンなガルバリウム鋼板の質感
・シャープでミニマルなデザイン
・大きな窓ガラス
・背景：住宅街
・天候：晴れ
・人物：不要

【重要】
建物の形状や寸法感が変わるような解釈は絶対にしないでください。
元画像の輪郭線と構造はそのまま、質感だけを高精細フォトリアルに仕上げてください。"""


async def test_generation(image_path: str):
    """画像生成テスト"""
    print(f"Testing with image: {image_path}")

    # 画像読み込み
    with open(image_path, "rb") as f:
        image_bytes = f.read()

    print("Starting generation...")
    result_url = await generate_parse(image_bytes, TEST_PROMPT)

    if result_url:
        print(f"✅ Success! Result URL: {result_url}")
    else:
        print("❌ Generation failed")

    return result_url


async def test_webhook():
    """Webhook エンドポイントテスト"""
    import httpx

    print("Testing webhook endpoint...")
    async with httpx.AsyncClient() as client:
        try:
            res = await client.get("http://localhost:8000/")
            print(f"GET /: {res.status_code}")
            print(f"Response: {res.json()}")
        except Exception as e:
            print(f"Error: {e}")


if __name__ == "__main__":
    if len(sys.argv) > 1:
        # 画像パスが指定された場合
        image_path = sys.argv[1]
        if Path(image_path).exists():
            asyncio.run(test_generation(image_path))
        else:
            print(f"File not found: {image_path}")
    else:
        # Webhookテスト
        asyncio.run(test_webhook())
        print("\nUsage: python test_local.py <image_path>")
