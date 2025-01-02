import os
import openai
import environ
from django.conf import settings

# 環境変数からAPIキーを取得
env = environ.Env()
SECRET_KEY = env('SECRET_KEY')
openai.api_key = SECRET_KEY

async def chat_gpt_async(prompt):
    """
    GPT-3.5-turboを使用してプロンプトを処理する関数。
    """
    try:
        # 非同期で ChatGPT にリクエストを送る
        response = await openai.ChatCompletion.acreate(
            model="gpt-3.5-turbo",
            messages=[
                {"role": "system", "content": "You are a helpful assistant."},
                {"role": "user", "content": prompt}
            ],
            temperature=0.7,
            max_tokens=300,
            top_p=1.0,
            frequency_penalty=0.0,
            presence_penalty=0.0,
        )
        # 応答のテキスト部分を返す
        return response["choices"][0]["message"]["content"].strip()
    except openai.error.OpenAIError as e:
        # エラー処理を実装
        return f"OpenAIエラー: {str(e)}"


def create_prompt(question, file_name):
    """
    プロンプトテンプレートを読み込み、ユーザーの質問を組み込む関数。
    """
    prompt_file = os.path.join(settings.BASE_DIR, 'template', file_name)
    with open(prompt_file, encoding="utf-8") as f:
        file_read = f.read()

    # Chat-GPTへ投げるフォーマットに入力文をセットする
    prompt = file_read.replace("[input]", question)
    return prompt
