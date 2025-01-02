from django.db import models
from apps.account.models import User
from apps.utility.models import BaseModel


class Thread(BaseModel):
    """
    会話のスレッドのモデル。
    （AIとの会話をスレッド毎に分けて管理するために使用）
    """
    user = models.ForeignKey(User, related_name="thread", on_delete=models.CASCADE)
    title = models.CharField('スレッドのタイトル', max_length=200)

    class Meta:
        verbose_name = 'スレッド'
        verbose_name_plural = 'スレッド'
        db_table = 'thread'

    def __str__(self):
        return self.title


class QuestionAndAnswer(BaseModel):
    """
    AIとの会話を記録するモデル。
    """
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    thread = models.ForeignKey(Thread, related_name="question_and_answer", on_delete=models.CASCADE)
    question = models.CharField('ユーザーからの質問', max_length=2000)
    answer = models.CharField('AIからの回答', max_length=2000, null=True)

    class Meta:
        verbose_name = '質問と回答'
        verbose_name_plural = '質問と回答'
        db_table = 'question'

    def __str__(self):
        return self.question
