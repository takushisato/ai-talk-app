import environ
import os
from openai import OpenAI
from django.conf import settings

# 環境変数からopenAIのキーを取得
env = environ.Env()
SECRET_KEY = env('SECRET_KEY')
client = OpenAI(api_key=SECRET_KEY)


def chat_gpt(prompt):
    # API KEYをセット

    # OpenAIのインスタンスを生成
    client.models.list()

    # APIを使ってリクエストを投げる（下記リンクが公式）
    # https://platform.openai.com/docs/models/gpt-3
    response = client.completions.create(model="text-davinci-003",
                                         prompt=prompt,
                                         temperature=0,
                                         max_tokens=300,
                                         top_p=1.0,
                                         frequency_penalty=0.0,
                                         presence_penalty=0.0)
    response = response.choices[0].text.strip()
    return response


def create_prompt(question, file_name):
    prompt_file = os.path.join(settings.BASE_DIR, 'template', file_name)
    with open(prompt_file, encoding="utf-8") as f:
        file_read = f.read()
    # Chat-GTPへ投げるフォーマットに入力文をセットする。
    prompt = file_read.replace("[input]", question)
    return prompt
